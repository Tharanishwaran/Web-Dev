# React useRef Hook - Complete Notes

**File name suggestion:** `10_useRef_Hook.md`

***

## Overview

`useRef` is a React Hook that returns a **mutable reference object** that persists across component re-renders. It has a `.current` property that you can read and update without causing re-renders.[1][2][3][5]

***

## Basic Syntax

```javascript
import { useRef } from 'react';

const myRef = useRef(initialValue);
```

- Returns a ref object: `{ current: initialValue }`
- `.current` holds the actual value[5]
- Updating `.current` does **NOT** trigger re-render[2][5]

***

## Two Main Use Cases

### 1. **Storing Mutable Values** (that persist across renders)
### 2. **Accessing DOM Elements** (direct DOM manipulation)

***

## Use Case 1: Storing Mutable Values

### Example: Click Counter (No UI Update Needed)

```javascript
import { useRef } from 'react';

function Counter() {
  const countRef = useRef(0);

  const handleClick = () => {
    countRef.current++;
    console.log(`Clicked ${countRef.current} times`);
  };

  console.log('Component rendered!'); // Logs only once

  return <button onClick={handleClick}>Click me</button>;
}
```

**Key Points:**
- `countRef.current` updates without triggering re-render[5]
- Value persists between renders
- Good for values you don't need to display in UI

***

### Example: Stopwatch with Timer ID

```javascript
import { useRef, useState } from 'react';

function Stopwatch() {
  const timerIdRef = useRef(null);
  const [seconds, setSeconds] = useState(0);

  const start = () => {
    if (timerIdRef.current) return; // Already running
    
    timerIdRef.current = setInterval(() => {
      setSeconds(s => s + 1);
    }, 1000);
  };

  const stop = () => {
    clearInterval(timerIdRef.current);
    timerIdRef.current = null;
  };

  return (
    <div>
      <p>Seconds: {seconds}</p>
      <button onClick={start}>Start</button>
      <button onClick={stop}>Stop</button>
    </div>
  );
}
```

**Why useRef here?**
- Store timer ID without causing re-renders[5]
- Access the same timer ID across renders to clear it

***

### Example: Tracking Previous Value

```javascript
import { useRef, useState, useEffect } from 'react';

function PreviousValue() {
  const [count, setCount] = useState(0);
  const prevCountRef = useRef();

  useEffect(() => {
    prevCountRef.current = count; // Store current as previous
  }, [count]);

  return (
    <div>
      <p>Current: {count}</p>
      <p>Previous: {prevCountRef.current}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}
```

***

## Use Case 2: Accessing DOM Elements

### Example: Focus Input on Mount

```javascript
import { useRef, useEffect } from 'react';

function FocusInput() {
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus(); // Focus the input
  }, []);

  return <input ref={inputRef} placeholder="I will auto-focus" />;
}
```

**Steps to Access DOM:**
1. Create ref: `const inputRef = useRef(null)`
2. Attach to element: `<input ref={inputRef} />`
3. Access via: `inputRef.current` (the actual DOM element)[1][5]

***

### Example: Scroll to Element

```javascript
import { useRef } from 'react';

function ScrollToBottom() {
  const bottomRef = useRef(null);

  const scrollToBottom = () => {
    bottomRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div>
      <button onClick={scrollToBottom}>Scroll to Bottom</button>
      
      <div style={{ height: '2000px' }}>
        <p>Lots of content...</p>
      </div>
      
      <div ref={bottomRef}>Bottom of page</div>
    </div>
  );
}
```

***

### Example: Measuring Element Size

```javascript
import { useRef, useState } from 'react';

function MeasureElement() {
  const divRef = useRef(null);
  const [width, setWidth] = useState(0);

  const measureWidth = () => {
    const rect = divRef.current.getBoundingClientRect();
    setWidth(rect.width);
  };

  return (
    <div>
      <div ref={divRef} style={{ width: '50%', background: 'lightblue' }}>
        Measure me
      </div>
      <button onClick={measureWidth}>Get Width</button>
      <p>Width: {width}px</p>
    </div>
  );
}
```

***

## useRef vs useState

| Feature | useRef | useState |
|---------|--------|----------|
| Triggers re-render | ❌ No | ✅ Yes |
| Persists across renders | ✅ Yes | ✅ Yes |
| Updates UI | ❌ No | ✅ Yes |
| Use for | DOM refs, timers, non-visual data | UI data that needs to be displayed |
| Access value | `ref.current` | Direct variable |

***

## Important Rules

### ✅ DO: Update refs in event handlers or effects

```javascript
const myRef = useRef(0);

const handleClick = () => {
  myRef.current++; // ✅ Good in event handler
};

useEffect(() => {
  myRef.current++; // ✅ Good in effect
}, []);
```

### ❌ DON'T: Update refs during rendering

```javascript
function Component() {
  const myRef = useRef(0);
  
  myRef.current++; // ❌ BAD - during render
  
  if (someCondition) {
    myRef.current++; // ❌ BAD - during render
  }
  
  return <div>{/* ... */}</div>;
}
```

**Why?** Updating refs during render can cause unpredictable behavior.[5]

***

## Ref is Null on Initial Render

```javascript
function Component() {
  const divRef = useRef();

  console.log(divRef.current); // undefined (during render)

  useEffect(() => {
    console.log(divRef.current); // <div>...</div> (after mount)
  }, []);

  return <div ref={divRef}>Hello</div>;
}
```

**Why?** React hasn't created the DOM element yet during initial render.[5]

**Solution:** Access refs in `useEffect` or event handlers.

***

## Common Use Cases Summary

| Use Case | Example |
|----------|---------|
| Focus input | `inputRef.current.focus()` |
| Store timer ID | `timerIdRef.current = setInterval(...)` |
| Track previous value | Store in ref, update in useEffect |
| Measure DOM element | `divRef.current.getBoundingClientRect()` |
| Scroll to element | `elementRef.current.scrollIntoView()` |
| Play/pause video | `videoRef.current.play()` |
| Store WebSocket connection | `socketRef.current = new WebSocket(...)` |

***

## Complete Example: Input with Character Count

```javascript
import { useRef, useState } from 'react';

function CharacterCounter() {
  const inputRef = useRef(null);
  const [text, setText] = useState('');

  const focusInput = () => {
    inputRef.current.focus();
  };

  const clearInput = () => {
    setText('');
    inputRef.current.focus();
  };

  return (
    <div>
      <input
        ref={inputRef}
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type something..."
      />
      <p>Characters: {text.length}</p>
      <button onClick={focusInput}>Focus Input</button>
      <button onClick={clearInput}>Clear</button>
    </div>
  );
}
```

***

## Key Takeaways

✅ **useRef returns a mutable ref object** with `.current` property[3][2]
✅ **Updating `.current` does NOT trigger re-render**[5]
✅ **Value persists across re-renders**[5]
✅ **Use for DOM access** (focus, scroll, measure)[1]
✅ **Use for mutable values** (timers, previous values, counters)[2]
✅ **Access refs in useEffect or event handlers**, not during render[5]
✅ **Refs are `null`/`undefined` on initial render**[5]

***

## When to Use useRef vs useState

**Use `useRef` when:**
- You need to store a value that doesn't affect UI
- You need to access DOM elements
- You need to store timer IDs, subscriptions, etc.
- You want to avoid unnecessary re-renders

**Use `useState` when:**
- The value should be displayed in UI
- Changing the value should trigger re-render
- You want React to track the value

***

