# **React Notes: Props vs State**

## 📚 **Props (Properties)**

### **What are Props?**
- Data passed **FROM PARENT → CHILD** components
- Like **function parameters** for components
- **Read-only** - cannot be modified by receiving component

### **When to Use Props:**
```jsx
// Parent Component
function App() {
  return <User name="John" age={25} />;
}

// Child Component  
function User(props) {
  return <h1>Hello {props.name}, Age: {props.age}</h1>;
}
```

### **Props Characteristics:**
- ✅ **Immutable** - cannot be changed by child
- ✅ **Flow downward** - parent → child only  
- ✅ **For configuration** - customize component behavior
- ✅ **Make components reusable**

---

## 🔄 **State**

### **What is State?**
- Data that **CHANGES OVER TIME** within a component
- **Local memory** for a component
- **Mutable** - can be updated using setter functions

### **When to Use State:**
```jsx
function Counter() {
  const [count, setCount] = useState(0); // State declaration
  
  return (
    <button onClick={() => setCount(count + 1)}>
      Count: {count}
    </button>
  );
}
```

### **State Characteristics:**
- ✅ **Mutable** - can be updated with setter
- ✅ **Local to component** - other components cannot access directly
- ✅ **Triggers re-renders** - component updates when state changes
- ✅ **For dynamic data** - values that change during component lifetime

---

## 🎯 **Key Differences**

| Aspect | Props | State |
|--------|-------|-------|
| **Mutability** | Immutable (read-only) | Mutable (can change) |
| **Purpose** | Pass data down | Manage changing data |
| **Scope** | Parent → Child flow | Local to component |
| **Triggers Re-render** | When parent re-renders | When setter function called |

---

## 💡 **When to Use Which?**

### **Use PROPS when:**
- Passing data from parent to child
- Data doesn't change within component  
- Configuring component behavior
- Making reusable components

### **Use STATE when:**
- Data changes over time
- User interactions change data
- Component needs to remember values
- Handling form inputs
- Tracking UI state (loading, errors, etc.)

---

## 🔄 **Sharing State Between Components**

### **Method 1: Lift State Up**
```jsx
function Parent() {
  const [count, setCount] = useState(0); // State in parent
  
  return (
    <div>
      <ChildA count={count} />
      <ChildB setCount={setCount} />
    </div>
  );
}
```

### **Method 2: Context API**
```jsx
// Create context
const UserContext = createContext();

// Provide context
<UserContext.Provider value={{user, setUser}}>
  <ChildComponents />
</UserContext.Provider>

// Use context in any child
const {user, setUser} = useContext(UserContext);
```

---

## 🚫 **Common Mistakes**

### **Don't Modify Props:**
```jsx
function User(props) {
  props.name = "Mike"; // ❌ NEVER DO THIS!
  return <h1>{props.name}</h1>;
}
```

### **Don't Import State Directly:**
```jsx
// File A.jsx
const [count, setCount] = useState(0);
export { count, setCount }; // ❌ WON'T WORK!

// File B.jsx  
import { count, setCount } from './A'; // ❌ CAN'T ACCESS
```

---

## 🎪 **Simple Analogy**

### **Props = "Here's some data for you to display"** 📥
```jsx
<Book title="React Guide" pages={300} />
```

### **State = "I need to remember something that might change"** 💾  
```jsx
const [isReading, setIsReading] = useState(false);
```

---

## ✅ **Quick Rules**

1. **Props down, events up** - Data flows down via props, actions flow up via callbacks
2. **State is local** - Each component manages its own state
3. **Lift state up** when siblings need to share data
4. **Use context** when many components need the same data

---

**Remember:** Props are for configuration, State is for interaction! 🚀


## Props Drilling
## What Is Prop Drilling?

Imagine you need to pass data from Component A to Component D, but you have to go through B and C first—even though B and C don't use that data at all. That's prop drilling.[3][1]

**Visual Example:**
```
App (has the data)
  ↓ passes data
ComponentA (doesn't need it, just passes it down)
  ↓ passes data
ComponentB (doesn't need it, just passes it down)
  ↓ passes data
ComponentC (finally uses the data!)
```

## Code Example

```javascript
// App has user data
function App() {
  const user = { name: "Astra", role: "Developer" };
  
  return <ComponentA user={user} />;
}

// ComponentA doesn't use 'user', just passes it down
function ComponentA({ user }) {
  return (
    <div>
      <h1>Component A</h1>
      <ComponentB user={user} />  {/* Passing it through */}
    </div>
  );
}

// ComponentB doesn't use 'user', just passes it down
function ComponentB({ user }) {
  return (
    <div>
      <h2>Component B</h2>
      <ComponentC user={user} />  {/* Passing it through */}
    </div>
  );
}

// ComponentC FINALLY uses it!
function ComponentC({ user }) {
  return <p>Welcome, {user.name}!</p>;  {/* Actually using it */}
}
```

**The Problem:** ComponentA and ComponentB don't need `user` data, but they're forced to accept it and pass it down. This makes code messy and hard to maintain.[2][5][1]

## Why Is Prop Drilling Bad?

1. **Messy code** - Middle components get cluttered with props they don't use[5][2]
2. **Hard to maintain** - If you need to change the prop name, you have to change it in many files[1][3]
3. **Difficult to debug** - Tracking where data comes from becomes confusing[6]
4. **Tight coupling** - Components become dependent on each other unnecessarily[1]

## How to Avoid Prop Drilling

### Solution 1: Context API (Best for Your Case)

This is what I showed you earlier! Context lets you "teleport" data directly to the component that needs it:[4][5][1]

```javascript
// Create Context
import { createContext, useContext } from 'react';

const UserContext = createContext();

// App provides the data
function App() {
  const user = { name: "Astra", role: "Developer" };
  
  return (
    <UserContext.Provider value={user}>
      <ComponentA />  {/* No prop needed! */}
    </UserContext.Provider>
  );
}

// ComponentA - no props needed
function ComponentA() {
  return (
    <div>
      <h1>Component A</h1>
      <ComponentB />  {/* No prop needed! */}
    </div>
  );
}

// ComponentB - no props needed
function ComponentB() {
  return (
    <div>
      <h2>Component B</h2>
      <ComponentC />  {/* No prop needed! */}
    </div>
  );
}

// ComponentC directly accesses the data!
function ComponentC() {
  const user = useContext(UserContext);  // Gets data directly!
  return <p>Welcome, {user.name}!</p>;
}
```

**What changed?** ComponentA and ComponentB are now clean—they don't deal with props they don't need. ComponentC just grabs the data directly using `useContext`.[4][5][1]

### Solution 2: Component Composition

Sometimes you can restructure your components to avoid passing props at all:

```javascript
function App() {
  const user = { name: "Astra" };
  
  return (
    <ComponentA>
      <ComponentC user={user} />  {/* Pass ComponentC directly */}
    </ComponentA>
  );
}

function ComponentA({ children }) {
  return (
    <div>
      <h1>Component A</h1>
      {children}  {/* Render whatever was passed */}
    </div>
  );
}
```

## When Is Prop Drilling Okay?

If you're only passing props through **1-2 levels**, prop drilling is fine. It's only a problem when you're drilling through **3+ levels** of components.[5]

## Key Takeaway

**Prop drilling** = Passing props through components that don't need them[2][1]
**Solution** = Use Context API to skip the middle components and deliver data directly[4][5][1]

This connects back to your earlier question about sharing state across files—Context API solves both prop drilling AND cross-file state sharing![5][1]



