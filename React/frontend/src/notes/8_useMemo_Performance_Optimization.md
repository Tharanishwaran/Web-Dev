# React useMemo Hook - Complete Guide

**Note Name:** `08_useMemo_Performance_Optimization.md`

***

## Overview
**useMemo** is a React Hook that caches the result of an expensive calculation between re-renders. It helps optimize performance by preventing unnecessary recalculations when dependencies haven't changed.[1][4][5][7]

***

## What is useMemo?

**useMemo** = "Use Memory" → Remember a calculated value[1]

It **saves** (memoizes) the result of a calculation and only recalculates when dependencies change.[5]

### Basic Syntax
```javascript
const memoizedValue = useMemo(() => {
  // Expensive calculation
  return result;
}, [dependencies]);
```

**Three Parts:**
1. **Function** - Returns the value to cache
2. **Dependencies** - Array of values to watch[1]
3. **Return value** - The cached result

***

## The Problem (Without useMemo)

### Example: Any State Change = Everything Recalculates

```javascript
import { useState } from 'react';

function App() {
  const [count, setCount] = useState(0);
  const [name, setName] = useState('');

  // This runs on EVERY render!
  function doubleCount() {
    console.log('Calculating double...');
    return count * 2;
  }

  const result = doubleCount();

  return (
    <div>
      <h1>Count: {count}</h1>
      <h2>Double: {result}</h2>
      
      <button onClick={() => setCount(count + 1)}>Increment</button>
      
      {/* Typing here causes doubleCount() to run! */}
      <input 
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Type your name"
      />
    </div>
  );
}
```

**Problem:** When you type in the input, the component re-renders → `doubleCount()` runs even though `count` didn't change.[5]

**Why?** Any state change causes the entire component to re-render, running all code inside it again.

***

## The Solution (With useMemo)

```javascript
import { useState, useMemo } from 'react';

function App() {
  const [count, setCount] = useState(0);
  const [name, setName] = useState('');

  // useMemo: Calculate ONLY when count changes
  const result = useMemo(() => {
    console.log('Calculating double...');
    return count * 2;
  }, [count]); // ← Only recalculate when count changes

  return (
    <div>
      <h1>Count: {count}</h1>
      <h2>Double: {result}</h2>
      
      <button onClick={() => setCount(count + 1)}>Increment</button>
      
      {/* Typing here no longer recalculates! */}
      <input 
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Type your name"
      />
    </div>
  );
}
```

**Result:** Typing in the input doesn't trigger "Calculating double..." anymore ![7]

***

## When to Use useMemo ✅

### Use Cases[4][5]

**1. Expensive Calculations**
```javascript
const result = useMemo(() => {
  return complexMathOperation(input1, input2);
}, [input1, input2]);
```

**2. Filtering/Sorting Large Arrays**
```javascript
const filteredUsers = useMemo(() => {
  return users.filter(u => u.age > 18);
}, [users]);
```

**3. Data Transformation**
```javascript
const formattedData = useMemo(() => {
  return rawData.map(item => ({
    ...item,
    displayName: item.name.toUpperCase()
  }));
}, [rawData]);
```

**4. Creating Objects/Arrays for Props**[1]
```javascript
const options = useMemo(() => {
  return { sortBy, filter };
}, [sortBy, filter]);
```

***

## When NOT to Use useMemo ❌

### Don't Use For[3][5]

**1. Simple Operations**
```javascript
// ❌ Unnecessary
const sum = useMemo(() => a + b, [a, b]);
const fullName = useMemo(() => `${first} ${last}`, [first, last]);

// ✅ Just use regular variables
const sum = a + b;
const fullName = `${first} ${last}`;
```

**2. Everything**
Don't wrap every value in useMemo - it adds unnecessary complexity.[3][4]

***

## Real-World Examples

### Example 1: Shopping Cart Total

```javascript
import { useState, useMemo } from 'react';

function ShoppingCart() {
  const [cart, setCart] = useState([
    { id: 1, name: 'Shirt', price: 500 },
    { id: 2, name: 'Jeans', price: 1000 }
  ]);
  const [coupon, setCoupon] = useState('');

  // Calculate total - only when cart changes
  const total = useMemo(() => {
    console.log('Calculating total...');
    return cart.reduce((sum, item) => sum + item.price, 0);
  }, [cart]);

  return (
    <div>
      <h2>Total: ₹{total}</h2>
      
      {cart.map(item => (
        <p key={item.id}>{item.name} - ₹{item.price}</p>
      ))}

      {/* Typing doesn't recalculate total */}
      <input
        value={coupon}
        onChange={(e) => setCoupon(e.target.value)}
        placeholder="Enter coupon code"
      />
    </div>
  );
}
```

### Example 2: Student Grades Average

```javascript
import { useState, useMemo } from 'react';

function StudentGrades() {
  const [students] = useState([
    { name: 'Astra', math: 85, science: 90 },
    { name: 'John', math: 70, science: 75 },
    { name: 'Sarah', math: 95, science: 88 }
  ]);
  const [searchName, setSearchName] = useState('');

  // Calculate average - only when students change
  const classAverage = useMemo(() => {
    console.log('Calculating class average...');
    const totalMarks = students.reduce(
      (sum, s) => sum + s.math + s.science, 
      0
    );
    return totalMarks / (students.length * 2);
  }, [students]);

  return (
    <div>
      <h2>Class Average: {classAverage.toFixed(2)}%</h2>
      
      {/* Typing doesn't recalculate average */}
      <input 
        value={searchName}
        onChange={(e) => setSearchName(e.target.value)}
        placeholder="Search student..."
      />

      {students.map(student => (
        <div key={student.name}>
          {student.name}: Math {student.math}, Science {student.science}
        </div>
      ))}
    </div>
  );
}
```

### Example 3: Filtering Large Lists

```javascript
import { useState, useMemo } from 'react';

function UserList() {
  const [users] = useState([
    { id: 1, name: 'Astra', city: 'Chennai', age: 22 },
    { id: 2, name: 'John', city: 'Mumbai', age: 30 },
    { id: 3, name: 'Sarah', city: 'Delhi', age: 25 }
    // ... 1000 more users
  ]);
  const [search, setSearch] = useState('');
  const [minAge, setMinAge] = useState(0);

  // Filter only when users, search, or minAge change
  const filteredUsers = useMemo(() => {
    console.log('Filtering users...');
    return users.filter(user =>
      user.name.toLowerCase().includes(search.toLowerCase()) &&
      user.age >= minAge
    );
  }, [users, search, minAge]);

  return (
    <div>
      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search by name..."
      />
      <input
        type="number"
        value={minAge}
        onChange={(e) => setMinAge(Number(e.target.value))}
        placeholder="Min age"
      />
      
      <h3>Results: {filteredUsers.length}</h3>
      {filteredUsers.map(user => (
        <div key={user.id}>
          {user.name} - {user.age} years - {user.city}
        </div>
      ))}
    </div>
  );
}
```

### Example 4: API Data Processing[4]

```javascript
import { useState, useEffect, useMemo } from 'react';

function DataDisplay() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch('/api/data')
      .then(res => res.json())
      .then(setData);
  }, []);

  // Process data only when it changes
  const processedData = useMemo(() => {
    if (!data) return [];
    
    console.log('Processing data...');
    return data
      .filter(item => item.active)
      .map(item => ({
        ...item,
        displayName: item.name.toUpperCase()
      }))
      .sort((a, b) => a.displayName.localeCompare(b.displayName));
  }, [data]);

  if (!data) return <p>Loading...</p>;

  return (
    <div>
      {processedData.map(item => (
        <div key={item.id}>{item.displayName}</div>
      ))}
    </div>
  );
}
```

***

## Dependency Array Rules

### 1. Empty Array `[]`
```javascript
const value = useMemo(() => expensiveCalculation(), []);
// Calculates ONCE on first render, never again
```

### 2. With Dependencies[4][1]
```javascript
const value = useMemo(() => a + b, [a, b]);
// Recalculates when 'a' OR 'b' changes
```

### 3. Multiple Dependencies
```javascript
const filtered = useMemo(() => {
  return users.filter(u => 
    u.name.includes(search) && u.age > minAge
  );
}, [users, search, minAge]); // All three must be included
```

### 4. No Array (Wrong!) ❌
```javascript
const value = useMemo(() => a + b);
// Recalculates on EVERY render - useless!
```

***

## Common Mistakes

### Mistake 1: Forgetting Dependencies[4]

```javascript
const [count, setCount] = useState(0);
const [multiplier, setMultiplier] = useState(2);

// ❌ WRONG - Missing multiplier in dependencies
const result = useMemo(() => {
  return count * multiplier;
}, [count]); // Should be [count, multiplier]

// ✅ CORRECT - All variables used inside
const result = useMemo(() => {
  return count * multiplier;
}, [count, multiplier]);
```

### Mistake 2: Overusing useMemo[3][5]

```javascript
// ❌ BAD - useMemo for simple operations
const sum = useMemo(() => a + b, [a, b]);
const isEven = useMemo(() => count % 2 === 0, [count]);

// ✅ GOOD - Just use normal variables
const sum = a + b;
const isEven = count % 2 === 0;
```

### Mistake 3: Using for Functions[4]

```javascript
// ❌ WRONG - Use useCallback for functions
const handleClick = useMemo(() => {
  return () => console.log('Clicked');
}, []);

// ✅ CORRECT - Use useCallback
const handleClick = useCallback(() => {
  console.log('Clicked');
}, []);
```

***

## useMemo with Objects/Arrays[1]

### Problem: New Reference Every Render

```javascript
function Parent() {
  const [count, setCount] = useState(0);
  
  // New object created on EVERY render!
  const user = { name: 'Astra', age: 22 };
  
  return <Child user={user} />;
}

const Child = React.memo(({ user }) => {
  console.log('Child rendered');
  return <div>{user.name}</div>;
});
```

### Solution: useMemo for Stable Reference

```javascript
function Parent() {
  const [count, setCount] = useState(0);
  
  // Same object reference unless dependencies change
  const user = useMemo(() => {
    return { name: 'Astra', age: 22 };
  }, []); // Empty = never changes
  
  return <Child user={user} />;
}

const Child = React.memo(({ user }) => {
  console.log('Child rendered'); // Only logs once!
  return <div>{user.name}</div>;
});
```

***

## Best Practices[5][4]

### 1. Always Include Dependencies
Ensure all variables used inside are in the dependency array.[4]

### 2. Don't Overuse
Only use for expensive operations, not everywhere.[3]

### 3. Profile First, Optimize Second
Use React DevTools Profiler to identify performance bottlenecks.[5]

### 4. Add Console Logs for Debugging
```javascript
const result = useMemo(() => {
  console.log('🔄 Calculating...'); // Check if it's working
  return expensiveCalculation();
}, [dependency]);
```

### 5. Use for Large Lists
Arrays with 100+ items benefit from useMemo.[5]

***

## Quick Decision Guide

| Scenario | Use useMemo? |
|----------|-------------|
| Simple math (`a + b`) | ❌ No |
| String concatenation | ❌ No |
| Array with 5 items | ❌ No |
| Array with 1000+ items | ✅ Yes |
| Filtering/sorting | ✅ Yes |
| Expensive calculations | ✅ Yes |
| Creating objects for props | ✅ Yes (with React.memo) |
| Functions | ❌ No (use useCallback) |

***

## Important Notes

### 1. useMemo is a Hint[1]
React **may** discard cached values and recalculate. Don't rely on useMemo for **correctness**, only for **performance**.

### 2. Doesn't Guarantee Performance Gain
Sometimes useMemo itself has overhead. Profile to verify improvements.[5]

### 3. React DevTools
Use Profiler to see which components re-render and where optimization is needed.

***

## Summary

### What is useMemo?
A Hook that caches calculated values to avoid unnecessary recalculations.[7][1]

### When to Use?
- Expensive calculations (loops, recursion)
- Filtering/sorting large arrays
- Data transformations
- Creating objects/arrays for props

### When NOT to Use?
- Simple operations (math, strings)
- Everything (don't overuse)
- Functions (use useCallback instead)

### Syntax
```javascript
const memoizedValue = useMemo(() => {
  return calculation();
}, [dependencies]);
```

### Key Rules
✅ Include all dependencies in array[4]
✅ Only for expensive operations[5]
✅ Empty array `[]` = calculate once  
✅ With dependencies = recalculate when they change  
✅ Profile before optimizing[5]

**Next Topic:** useCallback (for memoizing functions)

