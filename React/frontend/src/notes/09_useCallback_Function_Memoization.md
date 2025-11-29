***

# React useCallback Hook – Complete Guide

**File name suggestion:** `09_useCallback_Function_Memoization.md`

***

## 1. What is useCallback?

`useCallback` is a React Hook that **memoizes a function** between re-renders, returning the **same function reference** until its dependencies change.

**Syntax:**
```javascript
const memoizedFn = useCallback(
  () => {
    // function body
  },
  [dependencies]
);
```

**Key Concept:** In JavaScript, functions are objects. Every time a function is created, it gets a new memory reference:
```javascript
const fn1 = () => {};
const fn2 = () => {};
console.log(fn1 === fn2); // false (different references)
```

`useCallback` ensures the same reference is returned across renders, which is critical for React's optimization techniques.

***

## 2. Why Do We Need useCallback?

### The Core Problem

**React's Re-render Behavior:**
1. Every state change triggers a component re-render
2. On each render, the entire component function executes from top to bottom
3. All functions defined inside are **recreated** with new memory references
4. Even if the function logic is identical, `oldFunction !== newFunction`

**Impact on Child Components:**
```javascript
function Parent() {
  const [count, setCount] = useState(0);
  
  // New function created on EVERY render
  const handleClick = () => {
    console.log('clicked');
  };
  
  return <Child onClick={handleClick} />; // Child receives "new" prop
}

const Child = React.memo(({ onClick }) => {
  // React.memo fails because onClick reference changes
  // Child re-renders unnecessarily
  return <button onClick={onClick}>Click</button>;
});
```

### What useCallback Solves

1. **Prevents unnecessary re-renders** of memoized child components
2. **Stabilizes function references** for `useEffect` dependencies
3. **Optimizes performance** in expensive component trees
4. **Enables proper memoization** with `React.memo`

***

## 3. How React Renders Work (Deep Dive)

### Without useCallback

```javascript
┌─────────────────────────────────────────┐
│ RENDER 1                                │
├─────────────────────────────────────────┤
│ Parent() executes                       │
│   ├─ count = 0                          │
│   ├─ handleClick created (0x001)        │
│   └─ Child receives onClick = 0x001     │
│                                         │
│ Child renders (first time)              │
└─────────────────────────────────────────┘
                  ↓
┌─────────────────────────────────────────┐
│ STATE CHANGE (count updates)            │
├─────────────────────────────────────────┤
│ Parent() executes AGAIN                 │
│   ├─ count = 1                          │
│   ├─ handleClick created (0x002) 🔴     │
│   └─ Child receives onClick = 0x002     │
│                                         │
│ React.memo compares:                    │
│   Previous: 0x001                       │
│   Current:  0x002                       │
│   Result: DIFFERENT → Re-render 🔴      │
└─────────────────────────────────────────┘
```

### With useCallback

```javascript
┌─────────────────────────────────────────┐
│ RENDER 1                                │
├─────────────────────────────────────────┤
│ Parent() executes                       │
│   ├─ count = 0                          │
│   ├─ useCallback stores function (0x001)│
│   └─ Child receives onClick = 0x001     │
│                                         │
│ Child renders (first time)              │
└─────────────────────────────────────────┘
                  ↓
┌─────────────────────────────────────────┐
│ STATE CHANGE (count updates)            │
├─────────────────────────────────────────┤
│ Parent() executes AGAIN                 │
│   ├─ count = 1                          │
│   ├─ useCallback checks deps []         │
│   ├─ Deps unchanged → returns (0x001) ✅│
│   └─ Child receives onClick = 0x001     │
│                                         │
│ React.memo compares:                    │
│   Previous: 0x001                       │
│   Current:  0x001                       │
│   Result: SAME → Skip re-render ✅      │
└─────────────────────────────────────────┘
```

***

## 4. Basic Example (No Child Component)

While `useCallback` is less impactful without children, it demonstrates the concept:

```javascript
import { useState, useCallback } from 'react';

function App() {
  const [count, setCount] = useState(0);
  const [name, setName] = useState('');

  // Memoized: recreated only when `count` changes
  const handleClick = useCallback(() => {
    alert(`Count is ${count}`);
  }, [count]);

  console.log('Component rendered');

  return (
    <div>
      <h1>Count: {count}</h1>
      <button onClick={handleClick}>Show Count</button>

      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Type your name"
      />
    </div>
  );
}
```

**Behavior:**
- Typing in input → Component re-renders
- `handleClick` is **NOT recreated** (same reference)
- Only recreated when `count` changes

**Note:** This example shows limited benefit because there's no child optimization. The real power comes with `React.memo`.

***

## 5. Real-World Example: Parent + Memoized Child

This is where `useCallback` truly shines:

```javascript
import { useState, useCallback } from 'react';
import React from 'react';

function Parent() {
  const [count, setCount] = useState(0);
  const [name, setName] = useState('');

  // ✅ Stable reference across renders
  const increment = useCallback(() => {
    setCount((prev) => prev + 1); // Functional update
  }, []); // Empty deps because we use functional update

  // ❌ Without useCallback, this would be recreated every render
  // const increment = () => {
  //   setCount((prev) => prev + 1);
  // };

  return (
    <div>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Type your name (triggers re-render)"
      />

      <MemoChild increment={increment} />
      <p>Count: {count}</p>
    </div>
  );
}

// React.memo prevents re-renders if props are the same
const MemoChild = React.memo(function MemoChild({ increment }) {
  console.log('🔴 Child rendered'); // Watch this in console
  
  return (
    <div>
      <button onClick={increment}>Increment Count</button>
      <p style={{ fontSize: '12px', color: 'gray' }}>
        I only re-render when my props actually change
      </p>
    </div>
  );
});

export default Parent;
```

**Test It:**
1. Type in the input → Parent re-renders, Child does NOT re-render ✅
2. Click "Increment" → Both re-render (count changed) ✅
3. Remove `useCallback` → Typing in input causes Child to re-render ❌

***

## 6. Dependency Array Deep Dive

### Rules for Dependencies

```javascript
const myFunction = useCallback(() => {
  // Any variable from component scope used here
  // must be in the dependency array
  console.log(count, name);
}, [count, name]); // ✅ All external variables listed
```

### Common Patterns

#### Pattern 1: Empty Dependencies (Stable Function)
```javascript
const handleClick = useCallback(() => {
  console.log('Static behavior, no external variables');
}, []); // Never recreated
```

#### Pattern 2: State Setter Dependencies
```javascript
// ❌ BAD: Includes state in deps
const increment = useCallback(() => {
  setCount(count + 1);
}, [count]); // Function recreated every time count changes

// ✅ GOOD: Use functional update
const increment = useCallback(() => {
  setCount(prev => prev + 1);
}, []); // Never recreated, always uses latest state
```

#### Pattern 3: Props as Dependencies
```javascript
function Child({ userId }) {
  const fetchUser = useCallback(() => {
    fetch(`/api/users/${userId}`);
  }, [userId]); // Recreated when userId changes

  useEffect(() => {
    fetchUser();
  }, [fetchUser]); // Won't cause infinite loop
}
```

#### Pattern 4: Multiple Dependencies
```javascript
const handleSubmit = useCallback(() => {
  submitForm(name, email, age);
}, [name, email, age]); // Recreated when ANY of these change
```

### What Happens When Dependencies Change?

```javascript
const [count, setCount] = useState(0);
const [multiplier, setMultiplier] = useState(2);

const calculate = useCallback(() => {
  return count * multiplier;
}, [count, multiplier]);

// Timeline:
// count=0, multiplier=2 → calculate = Function_A
// count=1, multiplier=2 → calculate = Function_B (new reference)
// count=1, multiplier=3 → calculate = Function_C (new reference)
```

***

## 7. useCallback vs Regular Function: Performance Impact

### Scenario: Large Component Tree

```javascript
// Without useCallback - BAD for large trees
function Dashboard() {
  const [filters, setFilters] = useState({});
  
  const handleFilterChange = (key, value) => {
    setFilters({ ...filters, [key]: value });
  };
  
  return (
    <>
      <Sidebar onFilterChange={handleFilterChange} />
      <DataTable data={data} /> {/* 10,000 rows */}
      <Charts filters={filters} /> {/* Complex charts */}
    </>
  );
}
```

**Problem:**
- Any filter change → All children re-render
- DataTable with 10,000 rows re-renders unnecessarily
- Charts recalculate everything
- **Result:** Laggy, unresponsive UI

```javascript
// With useCallback + React.memo - GOOD
function Dashboard() {
  const [filters, setFilters] = useState({});
  
  const handleFilterChange = useCallback((key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  }, []); // Stable reference
  
  return (
    <>
      <Sidebar onFilterChange={handleFilterChange} />
      <MemoDataTable data={data} /> {/* Skips re-render */}
      <MemoCharts filters={filters} /> {/* Only updates when filters change */}
    </>
  );
}

const MemoDataTable = React.memo(DataTable);
const MemoCharts = React.memo(Charts);
```

**Benefit:**
- Filter change → Only Sidebar and Charts update
- DataTable skips re-render ✅
- **Result:** Smooth, responsive UI

***

## 8. Common Pitfalls & Solutions

### Pitfall 1: Missing Dependencies

```javascript
// ❌ BAD: count is stale
const logCount = useCallback(() => {
  console.log(count); // Always logs initial value
}, []); // Missing count dependency

// ✅ FIX 1: Add dependency
const logCount = useCallback(() => {
  console.log(count);
}, [count]);

// ✅ FIX 2: Use ref for latest value without recreating
const countRef = useRef(count);
useEffect(() => { countRef.current = count; }, [count]);

const logCount = useCallback(() => {
  console.log(countRef.current);
}, []); // Can stay empty
```

### Pitfall 2: Object/Array in Dependencies

```javascript
// ❌ BAD: Object recreated every render
const [user, setUser] = useState({ name: 'John', age: 30 });

const greet = useCallback(() => {
  console.log(`Hello ${user.name}`);
}, [user]); // user object reference changes every render

// ✅ FIX: Use specific properties
const greet = useCallback(() => {
  console.log(`Hello ${user.name}`);
}, [user.name]); // Only recreate when name changes
```

### Pitfall 3: Using useCallback Everywhere (Over-optimization)

```javascript
// ❌ BAD: Unnecessary complexity
function SimpleButton() {
  const [count, setCount] = useState(0);
  
  const handleClick = useCallback(() => {
    setCount(c => c + 1);
  }, []); // Adds complexity with no benefit
  
  return <button onClick={handleClick}>{count}</button>;
}

// ✅ GOOD: Keep it simple
function SimpleButton() {
  const [count, setCount] = useState(0);
  
  return <button onClick={() => setCount(c => c + 1)}>{count}</button>;
}
```

### Pitfall 4: Forgetting React.memo

```javascript
// ❌ USELESS: useCallback without React.memo
function Parent() {
  const handleClick = useCallback(() => {}, []);
  return <Child onClick={handleClick} />; // Child not memoized
}

function Child({ onClick }) {
  return <button onClick={onClick}>Click</button>;
  // Re-renders every time Parent renders anyway!
}

// ✅ COMPLETE: useCallback + React.memo
const Child = React.memo(function Child({ onClick }) {
  return <button onClick={onClick}>Click</button>;
});
```

***

## 9. When to Use vs NOT Use

### ✅ Use useCallback When:

1. **Passing functions to memoized children**
   ```javascript
   const MemoChild = React.memo(Child);
   <MemoChild onAction={useCallback(() => {}, [])} />
   ```

2. **Function in useEffect/useMemo dependencies**
   ```javascript
   const fetchData = useCallback(() => {}, [userId]);
   useEffect(() => { fetchData(); }, [fetchData]);
   ```

3. **Performance profiling shows re-render issues**
   - Use React DevTools Profiler
   - Measure before optimizing

4. **Event handlers in large lists**
   ```javascript
   {items.map(item => (
     <ExpensiveItem 
       key={item.id} 
       onDelete={useCallback(() => deleteItem(item.id), [item.id])} 
     />
   ))}
   ```

### ❌ DON'T Use useCallback When:

1. **Function not passed to children**
   ```javascript
   // Unnecessary
   const handleClick = useCallback(() => {
     setCount(c => c + 1);
   }, []);
   
   return <button onClick={handleClick}>{count}</button>;
   ```

2. **Child not memoized**
   ```javascript
   // useCallback has no effect
   <UnmemoizedChild onClick={useCallback(() => {}, [])} />
   ```

3. **Component is simple/small**
   - Premature optimization
   - Adds complexity for no benefit

4. **No performance issues detected**
   - Profile first, optimize later
   - "Make it work, make it right, make it fast"

***

## 10. useCallback vs useMemo

| Feature | useCallback | useMemo |
|---------|-------------|---------|
| **Returns** | Memoized function | Memoized value |
| **Syntax** | `useCallback(fn, deps)` | `useMemo(() => value, deps)` |
| **Use Case** | Prevent function recreation | Prevent expensive calculations |
| **Example** | `useCallback(() => {}, [])` | `useMemo(() => expensive(), [])` |

**Relationship:**
```javascript
// These are equivalent:
useCallback(fn, deps)
useMemo(() => fn, deps)
```

**Choose useCallback** when you need to memoize a function.  
**Choose useMemo** when you need to memoize a computed value.

***

## 11. Real-World Use Cases

### Use Case 1: Search/Filter Component

```javascript
function SearchPage() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const handleSearch = useCallback(async (searchTerm) => {
    const data = await fetch(`/api/search?q=${searchTerm}`);
    setResults(data);
  }, []);

  return (
    <>
      <SearchBar onSearch={handleSearch} />
      <ResultsList results={results} />
    </>
  );
}

const SearchBar = React.memo(({ onSearch }) => {
  // Doesn't re-render when results update
  const [input, setInput] = useState('');
  
  return (
    <input 
      value={input}
      onChange={(e) => setInput(e.target.value)}
      onKeyDown={(e) => e.key === 'Enter' && onSearch(input)}
    />
  );
});
```

### Use Case 2: Event Handlers in Lists

```javascript
function TodoList({ todos }) {
  const [items, setItems] = useState(todos);

  const handleDelete = useCallback((id) => {
    setItems(prev => prev.filter(item => item.id !== id));
  }, []);

  const handleToggle = useCallback((id) => {
    setItems(prev => prev.map(item => 
      item.id === id ? { ...item, done: !item.done } : item
    ));
  }, []);

  return (
    <ul>
      {items.map(item => (
        <MemoTodoItem
          key={item.id}
          item={item}
          onDelete={handleDelete}
          onToggle={handleToggle}
        />
      ))}
    </ul>
  );
}

const MemoTodoItem = React.memo(TodoItem);
```

### Use Case 3: Debounced Functions

```javascript
function SearchInput() {
  const [query, setQuery] = useState('');

  const debouncedSearch = useCallback(
    debounce((value) => {
      fetch(`/api/search?q=${value}`);
    }, 500),
    []
  );

  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    debouncedSearch(value);
  };

  return <input value={query} onChange={handleChange} />;
}
```

***

## 12. Debugging useCallback

### Technique 1: Log Function Identity

```javascript
const handleClick = useCallback(() => {
  console.log('clicked');
}, [count]);

console.log('handleClick reference:', handleClick);
// Watch this in console - changes when count changes
```

### Technique 2: Track Re-renders

```javascript
const Child = React.memo(({ onClick }) => {
  const renderCount = useRef(0);
  renderCount.current++;
  
  console.log(`Child rendered ${renderCount.current} times`);
  return <button onClick={onClick}>Click</button>;
});
```

### Technique 3: React DevTools Profiler

1. Open React DevTools → Profiler tab
2. Click record
3. Interact with your app
4. Stop recording
5. View which components re-rendered and why

***

## 13. Advanced: useCallback with TypeScript

```typescript
import { useCallback } from 'react';

interface User {
  id: number;
  name: string;
}

function UserList() {
  const handleUserClick = useCallback((user: User): void => {
    console.log(`Clicked ${user.name}`);
  }, []);

  const handleDelete = useCallback((userId: number): Promise<void> => {
    return fetch(`/api/users/${userId}`, { method: 'DELETE' })
      .then(() => console.log('Deleted'));
  }, []);

  return <div>...</div>;
}
```

***

## 14. Summary & Mental Model

### The Mental Model

```
State Change → Component Re-renders → Functions Recreated → 
New References → Props Change → Children Re-render

With useCallback:
State Change → Component Re-renders → useCallback Returns Same Reference → 
Props Unchanged → Children Skip Re-render ✅
```

### Key Takeaways

1. **useCallback memoizes functions** to prevent recreation across renders
2. **Solves the reference equality problem** with React.memo
3. **Empty dependency array** = function never changes
4. **Use functional updates** to avoid adding state to dependencies
5. **Only useful with React.memo** or effect/memo dependencies
6. **Don't overuse** - measure first, optimize when needed
7. **Always include all external variables** in dependency array

### One-Line Summary

> **useCallback returns the same function reference across renders (until dependencies change), enabling React.memo to prevent unnecessary child re-renders.**

***

## 15. Practice Exercises

### Exercise 1: Basic Implementation
Create a counter with a memoized increment function passed to a child component.

### Exercise 2: Compare Performance
Build a component with/without useCallback and use React DevTools Profiler to measure the difference.

### Exercise 3: Complex Dependencies
Create a form with multiple fields where submit handler depends on specific fields only.

### Exercise 4: Debug Stale Closure
Intentionally create a stale closure bug by missing dependencies, then fix it.

***

**Next Steps:**
- Combine with `useMemo` for value memoization
- Learn `useRef` for mutable values without re-renders
- Explore React.memo's second argument for custom comparison
- Study React 19's automatic memoization features

***