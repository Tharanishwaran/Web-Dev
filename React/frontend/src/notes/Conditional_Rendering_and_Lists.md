# React Conditional Rendering & Lists - Complete Guide

***

## Overview
Conditional rendering and list rendering are fundamental React patterns that let you display different UI based on conditions and transform arrays of data into components.[1][2]

***

## Part 1: Conditional Rendering

### What Is Conditional Rendering?
Displaying different JSX based on conditions using JavaScript operators like `if`, `&&`, and `? :`.[5][1]

### Method 1: If-Else Statement
Best for complex logic with multiple conditions:[1][5]

```javascript
function Greeting({ isLoggedIn }) {
  if (isLoggedIn) {
    return <h1>Welcome back!</h1>;
  } else {
    return <h1>Please sign in.</h1>;
  }
}
```

### Method 2: Ternary Operator (Most Common)
Concise inline rendering for two outcomes:[6][1]

```javascript
function LoginButton({ isLoggedIn }) {
  return (
    <div>
      {isLoggedIn ? (
        <button>Logout</button>
      ) : (
        <button>Login</button>
      )}
    </div>
  );
}
```

### Method 3: Logical && Operator
Use when you only want to show something if condition is true:[2][1]

```javascript
function Notifications({ messages }) {
  return (
    <div>
      {messages.length > 0 && (
        <p>You have {messages.length} new messages</p>
      )}
    </div>
  );
}
```

**How it works:** `true && expression` evaluates to `expression`, `false && expression` evaluates to `false` (renders nothing).[2]

### Method 4: Switch Statement
Best for multiple conditions based on a single value:[3][7]

```javascript
function StatusBadge({ status }) {
  switch (status) {
    case 'active':
      return <span className="badge-green">Active</span>;
    case 'pending':
      return <span className="badge-yellow">Pending</span>;
    case 'inactive':
      return <span className="badge-red">Inactive</span>;
    default:
      return <span>Unknown</span>;
  }
}
```

### Method 5: Early Return
Handle edge cases upfront for cleaner code:[5]

```javascript
function UserProfile({ user }) {
  if (!user) return <p>Loading...</p>;
  if (user.banned) return <p>Account suspended</p>;
  
  return (
    <div>
      <h1>{user.name}</h1>
      <p>{user.email}</p>
    </div>
  );
}
```

***

## Part 2: Rendering Lists

### What Is List Rendering?
Transforming arrays of data into arrays of JSX elements using `.map()`.[9]

### Basic List Example

```javascript
function TodoList() {
  const todos = ['Learn React', 'Build a project', 'Get a job'];
  
  return (
    <ul>
      {todos.map((todo, index) => (
        <li key={index}>{todo}</li>
      ))}
    </ul>
  );
}
```

### List with Objects (Realistic)

```javascript
function UserList() {
  const users = [
    { id: 1, name: 'Astra', role: 'Developer' },
    { id: 2, name: 'John', role: 'Designer' },
    { id: 3, name: 'Sarah', role: 'Manager' }
  ];
  
  return (
    <div>
      {users.map(user => (
        <div key={user.id} className="user-card">
          <h3>{user.name}</h3>
          <p>{user.role}</p>
        </div>
      ))}
    </div>
  );
}
```

### The Key Prop
**Critical:** Always provide a unique `key` prop to help React identify which items changed:[9]
- ✅ **Good:** Use unique ID from data (`key={user.id}`)
- ❌ **Bad:** Use array index for dynamic lists (`key={index}`)

***

## Part 3: Combining Both Patterns

### Real-World Example: Product List

```javascript
function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://api.example.com/products')
      .then(res => res.json())
      .then(data => {
        setProducts(data);
        setLoading(false);
      });
  }, []);

  // Conditional: Loading state
  if (loading) {
    return <div>Loading products...</div>;
  }

  // Conditional: Empty state
  if (products.length === 0) {
    return <div>No products found</div>;
  }

  // List rendering with nested conditionals
  return (
    <div className="grid grid-cols-3 gap-4">
      {products.map(product => (
        <div key={product.id} className="bg-white p-4 rounded-lg shadow">
          <img src={product.image} alt={product.name} />
          <h3 className="font-bold">{product.name}</h3>
          <p className="text-gray-600">${product.price}</p>
          
          {/* Nested conditional */}
          {product.inStock ? (
            <button className="bg-green-500 text-white px-4 py-2">
              Add to Cart
            </button>
          ) : (
            <p className="text-red-500">Out of Stock</p>
          )}
        </div>
      ))}
    </div>
  );
}
```

***

## Practice Project: Task Manager

Complete app combining all concepts:

```javascript
import { useState } from 'react';

function TaskManager() {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState('');

  const addTask = () => {
    if (input.trim()) {
      setTasks([...tasks, { id: Date.now(), text: input, completed: false }]);
      setInput('');
    }
  };

  const toggleTask = (id) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow">
      <h1 className="text-2xl font-bold mb-4">Task Manager</h1>
      
      {/* Input Section */}
      <div className="flex gap-2 mb-4">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Add a new task..."
          className="flex-1 border px-3 py-2 rounded"
        />
        <button 
          onClick={addTask}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Add
        </button>
      </div>

      {/* Conditional: Empty state */}
      {tasks.length === 0 && (
        <p className="text-gray-500 text-center">No tasks yet. Add one above!</p>
      )}

      {/* List rendering */}
      <div className="space-y-2">
        {tasks.map(task => (
          <div 
            key={task.id} 
            className="flex items-center gap-3 p-3 border rounded"
          >
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => toggleTask(task.id)}
            />
            {/* Conditional styling */}
            <span className={task.completed ? 'line-through text-gray-400' : ''}>
              {task.text}
            </span>
            <button 
              onClick={() => deleteTask(task.id)}
              className="ml-auto text-red-500"
            >
              Delete
            </button>
          </div>
        ))}
      </div>

      {/* Conditional: Task count */}
      {tasks.length > 0 && (
        <p className="mt-4 text-sm text-gray-600">
          {tasks.filter(t => !t.completed).length} tasks remaining
        </p>
      )}
    </div>
  );
}

export default TaskManager;
```

***

## Best Practices

1. **Keep it simple** - Avoid deeply nested conditions[5]
2. **Use early returns** - Handle edge cases at the top[5]
3. **Extract complex logic** - Create separate components for readability[5]
4. **Always use keys** - Provide unique keys for list items, preferably IDs not indexes[9]
5. **Component-based rendering** - Break complex conditionals into smaller components[5]

***

## Key Concepts Summary

**Conditional Rendering:**
- `if-else` for complex logic
- Ternary `? :` for inline two-way conditions
- `&&` for single condition (show/hide)
- Switch for multiple value-based conditions
- Early returns for error/loading states

**List Rendering:**
- Use `.map()` to transform arrays into JSX
- Always provide unique `key` prop
- Combine with conditional rendering for empty states
- Filter arrays before mapping when needed

***

## What You've Learned

✅ Display different UI based on conditions  
✅ Render arrays of data dynamically  
✅ Handle loading and error states  
✅ Combine state, effects, conditionals, and lists  
✅ Build a complete interactive task manager  

**Next Topics:** React Router, Context API, Custom Hooks
