# React useReducer Hook - Complete Notes

**File name suggestion:** `11_useReducer_Hook.md`

***

## Overview

`useReducer` is a React Hook for managing **complex state logic** in a more organized way. It's like `useState` but for state that involves multiple sub-values or complex update logic.[1][2][3]

***

## Basic Syntax

```javascript
import { useReducer } from 'react';

const [state, dispatch] = useReducer(reducer, initialState);
```

- **state**: Current state value
- **dispatch**: Function to update state (sends actions)
- **reducer**: Function that determines how state updates
- **initialState**: Starting state value[1][2]

***

## The Reducer Function

### Reducer Signature:
```javascript
function reducer(state, action) {
  // return new state based on action
}
```

- **state**: Current state
- **action**: Object describing what happened
- **Returns**: New state[1][2]

***

## Basic Counter Example

```javascript
import { useReducer } from 'react';

// 1. Reducer function
function counterReducer(state, action) {
  switch (action.type) {
    case 'INCREMENT':
      return { count: state.count + 1 };
    case 'DECREMENT':
      return { count: state.count - 1 };
    case 'RESET':
      return { count: 0 };
    default:
      return state;
  }
}

// 2. Component using useReducer
function Counter() {
  const [state, dispatch] = useReducer(counterReducer, { count: 0 });

  return (
    <div>
      <p>Count: {state.count}</p>
      <button onClick={() => dispatch({ type: 'INCREMENT' })}>+</button>
      <button onClick={() => dispatch({ type: 'DECREMENT' })}>-</button>
      <button onClick={() => dispatch({ type: 'RESET' })}>Reset</button>
    </div>
  );
}
```

***

## Action Patterns

### 1. Simple Actions (Type Only)
```javascript
dispatch({ type: 'INCREMENT' });
dispatch({ type: 'RESET' });
```

### 2. Actions with Payload (Extra Data)
```javascript
dispatch({ type: 'ADD_TODO', text: 'Learn React' });
dispatch({ type: 'SET_COUNT', amount: 5 });
```

### 3. Using Action Constants
```javascript
const ACTION_TYPES = {
  INCREMENT: 'INCREMENT',
  DECREMENT: 'DECREMENT', 
  RESET: 'RESET'
};

// Usage:
dispatch({ type: ACTION_TYPES.INCREMENT });
```

### 4. Action Creators (Helper Functions)
```javascript
const increment = () => ({ type: 'INCREMENT' });
const incrementBy = (amount) => ({ type: 'INCREMENT_BY', amount });

// Usage:
dispatch(increment());
dispatch(incrementBy(5));
```

***

## Todo List Example (Complete)

```javascript
import { useReducer } from 'react';

// Action types as constants
const ACTION_TYPES = {
  ADD_TODO: 'ADD_TODO',
  TOGGLE_TODO: 'TOGGLE_TODO',
  DELETE_TODO: 'DELETE_TODO'
};

// Reducer function
function todoReducer(state, action) {
  switch (action.type) {
    case ACTION_TYPES.ADD_TODO:
      return {
        todos: [...state.todos, {
          id: Date.now(),
          text: action.text,
          completed: false
        }]
      };
    
    case ACTION_TYPES.TOGGLE_TODO:
      return {
        todos: state.todos.map(todo =>
          todo.id === action.id
            ? { ...todo, completed: !todo.completed }
            : todo
        )
      };
    
    case ACTION_TYPES.DELETE_TODO:
      return {
        todos: state.todos.filter(todo => todo.id !== action.id)
      };
    
    default:
      return state;
  }
}

// Component
function TodoApp() {
  const [state, dispatch] = useReducer(todoReducer, { todos: [] });

  return (
    <div>
      <button 
        onClick={() => dispatch({ 
          type: ACTION_TYPES.ADD_TODO, 
          text: 'New Todo' 
        })}
      >
        Add Todo
      </button>
      
      {state.todos.map(todo => (
        <div key={todo.id}>
          <span style={{ 
            textDecoration: todo.completed ? 'line-through' : 'none' 
          }}>
            {todo.text}
          </span>
          <button 
            onClick={() => dispatch({ 
              type: ACTION_TYPES.TOGGLE_TODO, 
              id: todo.id 
            })}
          >
            Toggle
          </button>
          <button 
            onClick={() => dispatch({ 
              type: ACTION_TYPES.DELETE_TODO, 
              id: todo.id 
            })}
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}
```

***

## Form State Management Example

```javascript
import { useReducer } from 'react';

function formReducer(state, action) {
  switch (action.type) {
    case 'UPDATE_FIELD':
      return {
        ...state,
        [action.field]: action.value,
        errors: {
          ...state.errors,
          [action.field]: null
        }
      };
    
    case 'SET_ERRORS':
      return {
        ...state,
        errors: action.errors
      };
    
    case 'RESET_FORM':
      return {
        name: '',
        email: '',
        age: '',
        errors: {}
      };
    
    default:
      return state;
  }
}

function Form() {
  const [state, dispatch] = useReducer(formReducer, {
    name: '',
    email: '',
    age: '',
    errors: {}
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validation and submission logic
    console.log('Form data:', state);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={state.name}
        onChange={(e) => dispatch({
          type: 'UPDATE_FIELD',
          field: 'name',
          value: e.target.value
        })}
        placeholder="Name"
      />
      
      <input
        value={state.email}
        onChange={(e) => dispatch({
          type: 'UPDATE_FIELD',
          field: 'email', 
          value: e.target.value
        })}
        placeholder="Email"
      />
      
      <button type="submit">Submit</button>
      <button 
        type="button"
        onClick={() => dispatch({ type: 'RESET_FORM' })}
      >
        Reset
      </button>
    </form>
  );
}
```

***

## API Data Fetching Example

```javascript
import { useReducer, useEffect } from 'react';

function apiReducer(state, action) {
  switch (action.type) {
    case 'FETCH_START':
      return { ...state, loading: true, error: null };
    
    case 'FETCH_SUCCESS':
      return { ...state, loading: false, data: action.data };
    
    case 'FETCH_ERROR':
      return { ...state, loading: false, error: action.error };
    
    case 'CLEAR_ERROR':
      return { ...state, error: null };
    
    default:
      return state;
  }
}

function DataFetcher() {
  const [state, dispatch] = useReducer(apiReducer, {
    data: null,
    loading: false,
    error: null
  });

  const fetchData = async () => {
    dispatch({ type: 'FETCH_START' });
    
    try {
      const response = await fetch('/api/data');
      const data = await response.json();
      dispatch({ type: 'FETCH_SUCCESS', data });
    } catch (error) {
      dispatch({ type: 'FETCH_ERROR', error });
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (state.loading) return <div>Loading...</div>;
  if (state.error) return <div>Error: {state.error.message}</div>;

  return (
    <div>
      <pre>{JSON.stringify(state.data, null, 2)}</pre>
      <button onClick={fetchData}>Reload</button>
    </div>
  );
}
```

***

## Lazy Initialization

```javascript
function init(initialCount) {
  return { count: initialCount };
}

function reducer(state, action) {
  switch (action.type) {
    case 'INCREMENT':
      return { count: state.count + 1 };
    case 'RESET':
      return init(action.payload);
    default:
      return state;
  }
}

function Counter({ initialCount }) {
  const [state, dispatch] = useReducer(reducer, initialCount, init);
  
  return (
    <>
      Count: {state.count}
      <button onClick={() => dispatch({ type: 'RESET', payload: initialCount })}>
        Reset
      </button>
    </>
  );
}
```

***

## useReducer vs useState

| Aspect | useState | useReducer |
|--------|----------|------------|
| **State Type** | Simple values | Complex objects |
| **Updates** | Direct setters | Action dispatchers |
| **Logic Location** | In event handlers | In reducer function |
| **Testing** | Harder (logic in components) | Easier (pure functions) |
| **Scalability** | Limited for complex state | Excellent for complex state |
| **Performance** | Good for simple cases | Better for deep updates |

***

## When to Use useReducer

### ✅ **Use useReducer when:**
- State has multiple related values
- Complex state update logic
- Next state depends on previous state
- State transitions are well-defined
- Sharing state logic between components
- Need better performance for deep updates

### ✅ **Use useState when:**
- Simple state (primitives, simple objects)
- Independent state values
- No complex update logic
- Local component state

***

## Best Practices

### 1. **Keep Reducers Pure**
```javascript
// ✅ Good - Pure function
function reducer(state, action) {
  switch (action.type) {
    case 'UPDATE':
      return { ...state, value: action.value };
    default:
      return state;
  }
}

// ❌ Bad - Impure (mutates state)
function badReducer(state, action) {
  state.value = action.value; // Mutation!
  return state;
}
```

### 2. **Use Action Constants**
```javascript
const ACTION_TYPES = {
  ADD: 'ADD',
  UPDATE: 'UPDATE',
  DELETE: 'DELETE'
};
```

### 3. **Use Action Creators**
```javascript
const addItem = (item) => ({
  type: ACTION_TYPES.ADD,
  payload: item
});

// Usage: dispatch(addItem(newItem));
```

### 4. **Initialize State Properly**
```javascript
// ✅ Good - Clear initial state
const initialState = {
  items: [],
  loading: false,
  error: null
};

const [state, dispatch] = useReducer(reducer, initialState);
```

***

## Common Patterns

### 1. **Combining with useContext (Global State)**
```javascript
const AppStateContext = React.createContext();

function appReducer(state, action) {
  switch (action.type) {
    case 'SET_USER':
      return { ...state, user: action.user };
    case 'SET_THEME':
      return { ...state, theme: action.theme };
    default:
      return state;
  }
}

export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(appReducer, {
    user: null,
    theme: 'light'
  });

  return (
    <AppStateContext.Provider value={{ state, dispatch }}>
      {children}
    </AppStateContext.Provider>
  );
}
```

### 2. **Using with Immer for Complex Updates**
```javascript
import { produce } from 'immer';

function reducer(state, action) {
  return produce(state, draft => {
    switch (action.type) {
      case 'UPDATE_NESTED':
        draft.users[action.id].profile.name = action.name;
        break;
    }
  });
}
```

***

## Key Takeaways

✅ **useReducer manages complex state** with actions and reducers[1][2]  
✅ **Reducer is a pure function** that takes (state, action) → new state[1]  
✅ **Dispatch function** sends actions to update state[2]  
✅ **Better for complex state** than multiple useStates[3]  
✅ **Easier testing** with pure reducer functions  
✅ **Centralized state logic** in one place  
✅ **Great for forms, API states, complex UI logic**  
✅ **Can combine with useContext** for global state management  

***

## Complete Example: Shopping Cart

```javascript
import { useReducer } from 'react';

function cartReducer(state, action) {
  switch (action.type) {
    case 'ADD_ITEM':
      const existingItem = state.items.find(item => item.id === action.item.id);
      if (existingItem) {
        return {
          ...state,
          items: state.items.map(item =>
            item.id === action.item.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        };
      }
      return {
        ...state,
        items: [...state.items, { ...action.item, quantity: 1 }]
      };
    
    case 'REMOVE_ITEM':
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.id)
      };
    
    case 'UPDATE_QUANTITY':
      return {
        ...state,
        items: state.items.map(item =>
          item.id === action.id
            ? { ...item, quantity: action.quantity }
            : item
        )
      };
    
    case 'CLEAR_CART':
      return { ...state, items: [] };
    
    default:
      return state;
  }
}

function ShoppingCart() {
  const [state, dispatch] = useReducer(cartReducer, { items: [] });

  const total = state.items.reduce(
    (sum, item) => sum + item.price * item.quantity, 
    0
  );

  return (
    <div>
      <h2>Shopping Cart (Total: ${total})</h2>
      {state.items.map(item => (
        <div key={item.id}>
          <span>{item.name} - ${item.price} x {item.quantity}</span>
          <button onClick={() => dispatch({
            type: 'UPDATE_QUANTITY',
            id: item.id,
            quantity: item.quantity + 1
          })}>+</button>
          <button onClick={() => dispatch({
            type: 'REMOVE_ITEM', 
            id: item.id
          })}>Remove</button>
        </div>
      ))}
      <button onClick={() => dispatch({ type: 'CLEAR_CART' })}>
        Clear Cart
      </button>
    </div>
  );
}
```