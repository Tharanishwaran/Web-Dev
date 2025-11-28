***

# React useCallback Hook – Beginner Notes

**File name suggestion:** `09_useCallback_Function_Memoization.md`

***

## 1. What is useCallback?

- `useCallback` is a React Hook that **remembers a function** between re-renders.  
- It returns the **same function reference** until its dependencies change.  
- Syntax:  
  ```javascript
  const memoizedFn = useCallback(
    () => {
      // function body
    },
    [dependencies]
  );
  ```

***

## 2. Why do we need useCallback?

- In React, **every state change = component re-renders**.  
- On each render, **all functions defined inside the component are recreated**.
- If you pass those functions to **child components** (especially `React.memo` components), the child may re-render unnecessarily because the function reference is new.

useCallback helps by:
- Keeping the **same function instance** across renders (until dependencies change).
- Preventing **unnecessary re-renders** of child components that receive that function as a prop.

***

## 3. Simple Example (No Child Component)

```javascript
import { useState, useCallback } from 'react';

function App() {
  const [count, setCount] = useState(0);
  const [name, setName] = useState('');

  // Memoized function: recreated only when `count` changes
  const handleClick = useCallback(() => {
    alert(`Count is ${count}`);
  }, [count]);

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

- Typing in the input re-renders the component, **but**:
  - `handleClick` is not recreated unless `count` changes.

***

## 4. Example with Child + React.memo (Real Use Case)

```javascript
import { useState, useCallback } from 'react';
import React from 'react';

function Parent() {
  const [count, setCount] = useState(0);
  const [name, setName] = useState('');

  // Without useCallback, this function is new on every render
  // With useCallback, reference stays the same until `count` changes
  const increment = useCallback(() => {
    setCount((prev) => prev + 1);
  }, []);

  return (
    <div>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Type your name"
      />

      <MemoChild increment={increment} />
      <p>Count: {count}</p>
    </div>
  );
}

// Child will only re-render if its props change
const MemoChild = React.memo(function MemoChild({ increment }) {
  console.log('Child rendered');
  return (
    <button onClick={increment}>
      Increment
    </button>
  );
});
```

- Typing in the input:
  - Parent re-renders.
  - `increment` keeps the **same reference** (because of `useCallback` with `[]`).
  - `MemoChild` does **not** re-render, because its props didn’t change.

***

## 5. Dependency Array Rules

```javascript
const fn = useCallback(() => {
  // uses: a, b
}, [a, b]);
```

- Include **all variables used inside** the callback in the dependency array.
- If your function uses **state setters with functional updates**, you often don’t need that state in dependencies:
  ```javascript
  const increment = useCallback(() => {
    setCount((c) => c + 1); // uses previous value
  }, []); // no `count` in deps needed
  ```

***

## 6. When to Use vs Not Use

### ✅ Use useCallback when:
- Passing functions to **memoized child components** (`React.memo`) to avoid unnecessary re-renders.
- A function is part of the **dependency array** in `useEffect` or another hook, and you want a stable reference.

### ❌ Don’t bother with useCallback when:
- The function is **not passed** to children.
- The component is small and you’re not seeing performance issues.
- It makes the code harder to read with no real benefit.

***

## 7. Summary in One Line

> **useCallback remembers a function so React doesn’t recreate it on every render, which helps avoid unnecessary re-renders in child components.**

***

If you want, next step can be: a small practice task where you implement a parent + child with and without `useCallback` and observe the console logs.

