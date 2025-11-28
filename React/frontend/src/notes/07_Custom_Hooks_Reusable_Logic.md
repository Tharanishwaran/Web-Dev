# React Custom Hooks - Complete Guide

**Note Name:** `07_Custom_Hooks_Reusable_Logic.md`

***

## Overview
Custom Hooks are JavaScript functions that let you extract and reuse component logic across multiple components. They allow you to share stateful logic without sharing the state itself—each component using a custom hook gets its own isolated state.[1][2]

***

## What Are Custom Hooks?

Custom Hooks are functions that:
1. **Start with "use"** (e.g., `useFetch`, `useForm`, `useToggle`)[3][1]
2. **Can call other React hooks** (useState, useEffect, etc.)[2]
3. **Return values** that components can use[3]
4. **Share logic, NOT data** - Each component gets its own state[9][2]

***

## Why Use Custom Hooks?

**Problem: Repetitive Logic**
```javascript
// Component 1
function UserProfile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/user')
      .then(res => res.json())
      .then(data => {
        setUser(data);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading...</p>;
  return <div>{user.name}</div>;
}

// Component 2 - SAME LOGIC REPEATED!
function PostList() {
  const [posts, setPosts] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/posts')
      .then(res => res.json())
      .then(data => {
        setPosts(data);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading...</p>;
  return <div>{posts.map(p => <p key={p.id}>{p.title}</p>)}</div>;
}
```

**Solution: Custom Hook (DRY - Don't Repeat Yourself)**[1][3]
```javascript
// hooks/useFetch.js
function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(url)
      .then(res => res.json())
      .then(data => {
        setData(data);
        setLoading(false);
      });
  }, [url]);

  return { data, loading };
}

// Now reuse in any component!
function UserProfile() {
  const { data: user, loading } = useFetch('/api/user');
  if (loading) return <p>Loading...</p>;
  return <div>{user.name}</div>;
}

function PostList() {
  const { data: posts, loading } = useFetch('/api/posts');
  if (loading) return <p>Loading...</p>;
  return <div>{posts.map(p => <p key={p.id}>{p.title}</p>)}</div>;
}
```

***

## Common Custom Hooks

### 1. useToggle (Boolean State Management)

```javascript
// hooks/useToggle.js
import { useState } from 'react';

function useToggle(initialValue = false) {
  const [value, setValue] = useState(initialValue);

  const toggle = () => setValue(prev => !prev);
  const setTrue = () => setValue(true);
  const setFalse = () => setValue(false);

  return [value, { toggle, setTrue, setFalse }];
}

export default useToggle;
```

**Usage:**
```javascript
import useToggle from './hooks/useToggle';

function Modal() {
  const [isOpen, { toggle, setTrue, setFalse }] = useToggle(false);

  return (
    <>
      <button onClick={setTrue}>Open Modal</button>
      
      {isOpen && (
        <div className="modal">
          <h2>Modal Content</h2>
          <button onClick={setFalse}>Close</button>
        </div>
      )}
    </>
  );
}
```

### 2. useLocalStorage (Persistent State)

```javascript
// hooks/useLocalStorage.js
import { useState, useEffect } from 'react';

function useLocalStorage(key, initialValue) {
  // Get from localStorage or use initial value
  const [value, setValue] = useState(() => {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : initialValue;
  });

  // Update localStorage when value changes
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
}

export default useLocalStorage;
```

**Usage:**
```javascript
import useLocalStorage from './hooks/useLocalStorage';

function Settings() {
  const [theme, setTheme] = useLocalStorage('theme', 'light');
  const [fontSize, setFontSize] = useLocalStorage('fontSize', 16);

  return (
    <div>
      <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
        Theme: {theme}
      </button>
      <button onClick={() => setFontSize(fontSize + 2)}>
        Font Size: {fontSize}px
      </button>
    </div>
  );
}
```

### 3. useFetch (API Data Fetching)[3]

```javascript
// hooks/useFetch.js
import { useState, useEffect } from 'react';

function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!url) return;

    setLoading(true);
    setError(null);

    fetch(url)
      .then(res => {
        if (!res.ok) throw new Error('Network response was not ok');
        return res.json();
      })
      .then(data => {
        setData(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, [url]);

  return { data, loading, error };
}

export default useFetch;
```

**Usage:**
```javascript
import useFetch from './hooks/useFetch';

function UserList() {
  const { data: users, loading, error } = useFetch('https://jsonplaceholder.typicode.com/users');

  if (loading) return <p>Loading users...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <ul>
      {users.map(user => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
}
```

### 4. useForm (Form State Management)[7]

```javascript
// hooks/useForm.js
import { useState } from 'react';

function useForm(initialValues) {
  const [values, setValues] = useState(initialValues);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setValues(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const reset = () => setValues(initialValues);

  return { values, handleChange, reset };
}

export default useForm;
```

**Usage:**
```javascript
import useForm from './hooks/useForm';

function ContactForm() {
  const { values, handleChange, reset } = useForm({
    name: '',
    email: '',
    message: '',
    subscribe: false
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', values);
    reset();
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="name"
        value={values.name}
        onChange={handleChange}
        placeholder="Name"
      />
      <input
        name="email"
        value={values.email}
        onChange={handleChange}
        placeholder="Email"
      />
      <textarea
        name="message"
        value={values.message}
        onChange={handleChange}
        placeholder="Message"
      />
      <label>
        <input
          type="checkbox"
          name="subscribe"
          checked={values.subscribe}
          onChange={handleChange}
        />
        Subscribe to newsletter
      </label>
      <button type="submit">Submit</button>
    </form>
  );
}
```

### 5. useDebounce (Delay Updates for Search)

```javascript
// hooks/useDebounce.js
import { useState, useEffect } from 'react';

function useDebounce(value, delay = 500) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
}

export default useDebounce;
```

**Usage:**
```javascript
import { useState, useEffect } from 'react';
import useDebounce from './hooks/useDebounce';

function SearchBar() {
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearch = useDebounce(searchTerm, 500);

  useEffect(() => {
    if (debouncedSearch) {
      // Only search after user stops typing for 500ms
      fetch(`/api/search?q=${debouncedSearch}`)
        .then(res => res.json())
        .then(data => console.log(data));
    }
  }, [debouncedSearch]);

  return (
    <input
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      placeholder="Search..."
    />
  );
}
```

### 6. useWindowSize (Responsive Design)[7]

```javascript
// hooks/useWindowSize.js
import { useState, useEffect } from 'react';

function useWindowSize() {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowSize;
}

export default useWindowSize;
```

**Usage:**
```javascript
import useWindowSize from './hooks/useWindowSize';

function ResponsiveComponent() {
  const { width } = useWindowSize();

  return (
    <div>
      <h1>Window width: {width}px</h1>
      {width < 768 ? (
        <p>Mobile view</p>
      ) : (
        <p>Desktop view</p>
      )}
    </div>
  );
}
```

### 7. usePrevious (Track Previous Value)[6]

```javascript
// hooks/usePrevious.js
import { useRef, useEffect } from 'react';

function usePrevious(value) {
  const ref = useRef();
  
  useEffect(() => {
    ref.current = value;
  }, [value]);
  
  return ref.current;
}

export default usePrevious;
```

**Usage:**
```javascript
import { useState } from 'react';
import usePrevious from './hooks/usePrevious';

function Counter() {
  const [count, setCount] = useState(0);
  const prevCount = usePrevious(count);

  return (
    <div>
      <p>Current: {count}</p>
      <p>Previous: {prevCount}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}
```

***

## Rules of Custom Hooks[2][1]

1. **Must start with "use"** - `useToggle`, `useFetch`, `useForm`[1]
2. **Call hooks at the top level** - No hooks inside loops, conditions, or nested functions[2]
3. **Each component gets isolated state** - Custom hooks don't share state between components[2]

***

## Key Concepts

### Custom Hooks Share Logic, NOT State[2]

```javascript
// Custom hook
function useCounter() {
  const [count, setCount] = useState(0);
  const increment = () => setCount(count + 1);
  return { count, increment };
}

// Component A
function ComponentA() {
  const { count, increment } = useCounter();
  return <button onClick={increment}>A: {count}</button>;
}

// Component B
function ComponentB() {
  const { count, increment } = useCounter();
  return <button onClick={increment}>B: {count}</button>;
}

// Result: ComponentA and ComponentB have SEPARATE counters
// Clicking A's button doesn't affect B's count
```

Each component gets its own isolated state when using the same custom hook.[2]

***

## Real-World Example: Todo App with Custom Hook

```javascript
// hooks/useTodos.js
import { useState, useEffect } from 'react';

function useTodos() {
  const [todos, setTodos] = useState(() => {
    const saved = localStorage.getItem('todos');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = (text) => {
    setTodos([...todos, { id: Date.now(), text, completed: false }]);
  };

  const toggleTodo = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  return { todos, addTodo, toggleTodo, deleteTodo };
}

export default useTodos;
```

```javascript
// App.jsx
import { useState } from 'react';
import useTodos from './hooks/useTodos';

function App() {
  const [input, setInput] = useState('');
  const { todos, addTodo, toggleTodo, deleteTodo } = useTodos();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      addTodo(input);
      setInput('');
    }
  };

  return (
    <div className="max-w-md mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Todo List</h1>
      
      <form onSubmit={handleSubmit} className="flex gap-2 mb-4">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Add a todo..."
          className="flex-1 border px-3 py-2 rounded"
        />
        <button className="bg-blue-500 text-white px-4 py-2 rounded">
          Add
        </button>
      </form>

      <div className="space-y-2">
        {todos.map(todo => (
          <div key={todo.id} className="flex items-center gap-3 p-3 border rounded">
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggleTodo(todo.id)}
            />
            <span className={todo.completed ? 'line-through text-gray-400' : ''}>
              {todo.text}
            </span>
            <button
              onClick={() => deleteTodo(todo.id)}
              className="ml-auto text-red-500"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
```

***

## Folder Structure

```
src/
├── hooks/
│   ├── useToggle.js
│   ├── useFetch.js
│   ├── useForm.js
│   ├── useLocalStorage.js
│   ├── useDebounce.js
│   ├── useWindowSize.js
│   └── useTodos.js
├── components/
├── pages/
└── App.jsx
```

***

## Best Practices

1. **Name starts with "use"** - Makes it clear it's a hook[1]
2. **Extract reusable logic** - If you're copying code between components, make a hook[1]
3. **Return what's needed** - Can return arrays, objects, functions, or primitives[2]
4. **One responsibility** - Each hook should do one thing well[9]
5. **Document your hooks** - Add comments explaining parameters and return values

***

## When to Create Custom Hooks

**Create a custom hook when:**[9][1]
- You're repeating the same logic in multiple components
- You want to share stateful logic (not state itself)
- Your component is getting too complex
- You want to abstract away implementation details

**Examples:**
- Form handling across multiple forms
- API fetching logic used in many places
- Authentication checks
- Window/document event listeners
- LocalStorage interactions

***

## Benefits of Custom Hooks[9]

✅ **Reusability** - Write once, use everywhere  
✅ **Cleaner components** - Extract complex logic  
✅ **Easier testing** - Test hooks in isolation  
✅ **Better organization** - Separate concerns  
✅ **Composition** - Combine multiple hooks together  

***

## Key Takeaways

✅ Custom hooks extract reusable logic into functions[1][2]
✅ Always start hook names with "use"[1]
✅ Each component using a hook gets its own isolated state[2]
✅ Combine multiple built-in hooks (useState, useEffect) inside custom hooks[2]
✅ Common patterns: useFetch, useForm, useToggle, useLocalStorage[3]
✅ Keeps components clean and logic reusable[9]

**For Your Social Media App:**
- `useAuth()` - Authentication logic
- `usePosts()` - Fetch and manage posts
- `useComments()` - Comment functionality
- `useLikes()` - Like/unlike logic
- `useFollow()` - Follow/unfollow users

**Next Topics:** useReducer, Performance Optimization (useMemo, useCallback), Form Libraries

