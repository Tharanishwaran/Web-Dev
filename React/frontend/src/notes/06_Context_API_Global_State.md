# React Context API - Complete Guide

**Note Name:** `06_Context_API_Global_State.md`

***

## Overview
Context API is a built-in React feature that allows you to share data across multiple components without passing props through every level (avoiding "prop drilling"). It's perfect for global state like user authentication, themes, language preferences, and shopping carts.[1][4][7]

---

## The Problem: Prop Drilling

**Without Context:**
```javascript
// App has user data
App (user) 
  ↓ props
Header (user) → doesn't use it, just passes down
  ↓ props  
Navbar (user) → doesn't use it, just passes down
  ↓ props
UserMenu (user) → finally uses it!
```

Every intermediate component must accept and pass props they don't need.[5][10]

---

## The Solution: Context API

**With Context:**
```javascript
App (provides user via Context)
  ↓ (invisible - no props)
UserMenu (directly accesses user from Context)
```

Components can access data directly without prop drilling.[4][5]

***

## Basic Setup

### Step 1: Create Context

```javascript
// context/AuthContext.jsx
import { createContext, useContext, useState } from 'react';

// Create context object
const AuthContext = createContext();

// Provider component that wraps your app
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = (userData) => {
    setUser(userData);
    setIsAuthenticated(true);
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
  };

  // Value object contains all data/functions to share
  const value = {
    user,
    isAuthenticated,
    login,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook to use this context
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}
```

### Step 2: Wrap App with Provider

```javascript
// main.jsx or App.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { AuthProvider } from './context/AuthContext';
import App from './App';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>
);
```

### Step 3: Use Context in Any Component

```javascript
// components/LoginForm.jsx
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth(); // Access context

  const handleSubmit = (e) => {
    e.preventDefault();
    const userData = { name: 'Astra', email };
    login(userData); // Update global state
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <button type="submit">Login</button>
    </form>
  );
}

export default LoginForm;
```

```javascript
// components/UserProfile.jsx
import { useAuth } from '../context/AuthContext';

function UserProfile() {
  const { user, isAuthenticated, logout } = useAuth();

  if (!isAuthenticated) {
    return <p>Please log in</p>;
  }

  return (
    <div>
      <h2>Welcome, {user.name}!</h2>
      <p>Email: {user.email}</p>
      <button onClick={logout}>Logout</button>
    </div>
  );
}

export default UserProfile;
```

```javascript
// components/Navbar.jsx
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

function Navbar() {
  const { isAuthenticated, user } = useAuth();

  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="flex justify-between items-center">
        <Link to="/">Home</Link>
        
        {isAuthenticated ? (
          <div className="flex gap-4 items-center">
            <span>Hello, {user.name}</span>
            <Link to="/profile">Profile</Link>
          </div>
        ) : (
          <Link to="/login">Login</Link>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
```

***

## Core Concepts

### 1. createContext()
Creates a context object:[2]
```javascript
import { createContext } from 'react';
const MyContext = createContext(defaultValue);
```

### 2. Provider Component
Wraps components and provides context value:[1][5]
```javascript
<MyContext.Provider value={sharedData}>
  {children}
</MyContext.Provider>
```

### 3. useContext() Hook
Accesses context value in any component:[3]
```javascript
import { useContext } from 'react';
const value = useContext(MyContext);
```

### 4. Custom Hook Pattern
Wraps useContext for cleaner API:[6]
```javascript
export function useMyContext() {
  const context = useContext(MyContext);
  if (!context) {
    throw new Error('useMyContext must be used within Provider');
  }
  return context;
}
```

***

## Real-World Examples

### Example 1: Theme Context (Dark/Light Mode)

```javascript
// context/ThemeContext.jsx
import { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'light';
  });

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  useEffect(() => {
    localStorage.setItem('theme', theme);
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
```

**Usage:**
```javascript
// components/ThemeToggle.jsx
import { useTheme } from '../context/ThemeContext';

function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <button onClick={toggleTheme}>
      {theme === 'dark' ? '☀️ Light' : '🌙 Dark'}
    </button>
  );
}
```

### Example 2: Shopping Cart Context

```javascript
// context/CartContext.jsx
import { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    setCart(prevCart => {
      const existing = prevCart.find(item => item.id === product.id);
      if (existing) {
        return prevCart.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId) => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId));
  };

  const getCartTotal = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getCartCount = () => {
    return cart.reduce((count, item) => count + item.quantity, 0);
  };

  return (
    <CartContext.Provider value={{
      cart,
      addToCart,
      removeFromCart,
      getCartTotal,
      getCartCount
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
```

**Usage:**
```javascript
// components/ProductCard.jsx
import { useCart } from '../context/CartContext';

function ProductCard({ product }) {
  const { addToCart } = useCart();

  return (
    <div className="border p-4 rounded">
      <h3>{product.name}</h3>
      <p>${product.price}</p>
      <button onClick={() => addToCart(product)}>
        Add to Cart
      </button>
    </div>
  );
}

// components/CartIcon.jsx
import { useCart } from '../context/CartContext';

function CartIcon() {
  const { getCartCount } = useCart();
  
  return (
    <div className="relative">
      🛒
      {getCartCount() > 0 && (
        <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center">
          {getCartCount()}
        </span>
      )}
    </div>
  );
}
```

***

## Multiple Contexts

You can nest multiple providers:[2][1]

```javascript
// main.jsx
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import { CartProvider } from './context/CartContext';

<AuthProvider>
  <ThemeProvider>
    <CartProvider>
      <App />
    </CartProvider>
  </ThemeProvider>
</AuthProvider>
```

Components can use multiple contexts:
```javascript
function Header() {
  const { user } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const { getCartCount } = useCart();

  return (
    <header>
      <h1>Welcome, {user?.name}</h1>
      <button onClick={toggleTheme}>Toggle Theme</button>
      <CartIcon count={getCartCount()} />
    </header>
  );
}
```

***

## When to Use Context API ✅

**Use Context when:**[11][12]

1. **Global state needed by many components**
   - User authentication (login status, user data)
   - Theme/appearance (dark mode, font size)
   - Language/localization (en, es, fr)
   - Shopping cart
   - Notifications

2. **Avoid prop drilling**
   - Passing props through 3+ levels
   - Intermediate components don't need the data

3. **Infrequent updates**
   - Data that changes occasionally, not constantly
   - User toggles theme once, not every second

**Example Use Cases:**
- Authentication: `useAuth()`
- Theme: `useTheme()`
- Language: `useLanguage()`
- Cart: `useCart()`
- Notifications: `useNotifications()`

***

## When NOT to Use Context API ❌

**Don't use Context for:**[12][11]

1. **Local component state**
   - Form inputs (use useState)
   - Toggle switches
   - Dropdown menus
   - Modal open/close state

2. **Frequently changing data**[12]
   - Search input on every keystroke
   - Mouse position tracking
   - Animation frame data
   
   *Why?* Every context update re-renders ALL consuming components.[12]

3. **Simple parent-child relationships**
   - Data only used in 1-2 components
   - Just pass props normally

4. **Very complex state logic**[13][12]
   - Use Redux, Zustand, or Recoil for:
     - Middleware requirements
     - Time-travel debugging
     - Advanced dev tools

***

## Best Practices

### 1. Create Custom Hooks
Always wrap useContext in a custom hook:[6]
```javascript
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}
```

### 2. Split Contexts by Concern
Don't put everything in one giant context:[5]
```javascript
// ✅ Good - Separate contexts
<AuthProvider>
  <ThemeProvider>
    <CartProvider>
      <App />
    </CartProvider>
  </ThemeProvider>
</AuthProvider>

// ❌ Bad - One massive context
<GlobalProvider> // Contains auth, theme, cart, notifications, etc.
```

### 3. Organize Context Files
```
src/
├── context/
│   ├── AuthContext.jsx
│   ├── ThemeContext.jsx
│   └── CartContext.jsx
├── components/
└── pages/
```

### 4. Provide Default Values
```javascript
const ThemeContext = createContext({
  theme: 'light',
  toggleTheme: () => {}
});
```

***

## Complete Example: Multi-Context App

```javascript
// App.jsx
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import { CartProvider } from './context/CartContext';
import Navbar from './components/Navbar';
import ProductList from './pages/ProductList';

function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <CartProvider>
          <div className="min-h-screen">
            <Navbar />
            <ProductList />
          </div>
        </CartProvider>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
```

***

## Key Takeaways

✅ Context API shares data across components without prop drilling[4][5]
✅ Use `createContext()`, `Provider`, and `useContext()`[3][2]
✅ Perfect for global state: auth, theme, language, cart[7]
✅ Create custom hooks for cleaner API[6]
✅ Don't use for frequently changing or local state[12]
✅ Multiple contexts can coexist in the same app[1]

**Next Topics:** Custom Hooks, useReducer, Performance Optimization
