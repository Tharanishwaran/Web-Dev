# JavaScript Functions - Complete Notes

## What Are Functions?

Functions are **reusable blocks of code** designed to perform specific tasks. They're fundamental building blocks that allow you to organize, reuse, and modularize your code.[2][4][5][10]

Functions in JavaScript are **first-class citizens** - they can be assigned to variables, passed as arguments, and returned from other functions.[10]

***

## Ways to Define Functions

### 1. Function Declaration

Traditional way using the `function` keyword:[4][5]

```javascript
function functionName(parameters) {
  // code to be executed
  return value;
}

// Example
function add(a, b) {
  return a + b;
}

add(2, 3);  // 5
```

**Characteristics:**
- Uses `function` keyword
- Must have a name
- **Hoisted** - can be called before declaration[5]
- Not an executable statement (no semicolon needed)
- Function-scoped or block-scoped (in strict mode)[5]

### 2. Function Expression

Function stored in a variable:[4]

```javascript
const functionName = function(parameters) {
  // code to be executed
  return value;
};

// Example
const multiply = function(a, b) {
  return a * b;
};

multiply(4, 3);  // 12
```

**Characteristics:**
- Function assigned to a variable
- Often anonymous (no name)
- Ends with semicolon (part of executable statement)
- **Not hoisted** - can't be called before definition
- Variable-scoped (`const`, `let`, or `var`)

### 3. Arrow Function (ES6)

Concise syntax using `=>`:[11][12]

```javascript
const functionName = (parameters) => {
  // code to be executed
  return value;
};

// Single expression (implicit return)
const square = x => x * x;

// Multiple parameters
const add = (a, b) => a + b;

// No parameters
const greet = () => "Hello!";
```

**Characteristics:**
- Shortest syntax
- Lexical `this` binding (inherits from parent)
- No `arguments` object
- Can't be used as constructor
- Implicit return for single expressions
- **Not hoisted**

### 4. Method Definition

Functions inside objects:[10]

```javascript
const obj = {
  // ES6 shorthand
  methodName(parameters) {
    return value;
  },
  
  // Traditional
  methodName: function(parameters) {
    return value;
  }
};

// Example
const calculator = {
  add(a, b) {
    return a + b;
  },
  multiply(a, b) {
    return a * b;
  }
};

calculator.add(2, 3);  // 5
```

### 5. Function Constructor (Rarely Used)

```javascript
const functionName = new Function("param1", "param2", "return param1 + param2");
```

***

## Function Components

```javascript
function functionName(parameter1, parameter2) {
  // Function body - code to execute
  return result;  // Return statement (optional)
}
```

**Parts:**
- `function` - keyword to declare function
- `functionName` - unique identifier
- `(parameter1, parameter2)` - parameters (inputs)
- `{ }` - curly braces contain function body
- `return` - specifies value to return (optional)

***

## Calling Functions

```javascript
function greet(name) {
  return `Hello, ${name}!`;
}

// Call the function
let message = greet("John");  // "Hello, John!"
```

**Execution Flow:**
1. Control transfers to function definition
2. Code inside function executes
3. Control returns to next statement after call

***

## Parameters vs Arguments

**Parameter**: Placeholder variable in function definition
**Argument**: Actual value passed when calling

```javascript
// 'a' and 'b' are parameters
function add(a, b) {
  return a + b;
}

// 5 and 3 are arguments
add(5, 3);  // 8
```

### Default Parameters

```javascript
function greet(name = "Guest") {
  return `Hello, ${name}!`;
}

greet();        // "Hello, Guest!"
greet("John");  // "Hello, John!"
```

### Rest Parameters

Accept unlimited arguments as array:[10]

```javascript
function sum(...numbers) {
  return numbers.reduce((total, num) => total + num, 0);
}

sum(1, 2, 3, 4, 5);  // 15
```

***

## Return Statement

Specifies the value returned by function:[5]

```javascript
function square(x) {
  return x * x;  // Returns the result
}

let result = square(5);  // result = 25
```

**Without return:**
```javascript
function sayHi() {
  console.log("Hi!");
  // No return - function returns undefined
}

let result = sayHi();  // result = undefined
```

**Multiple return paths:**
```javascript
function checkAge(age) {
  if (age >= 18) {
    return "Adult";
  }
  return "Minor";
}
```

***

## Function Comparison Table

| Feature | Declaration | Expression | Arrow | Method |
|---------|------------|------------|-------|--------|
| **Syntax** | `function name() {}` | `const name = function() {}` | `const name = () => {}` | `obj = { name() {} }` |
| **Hoisted** | ✅ Yes | ❌ No | ❌ No | ❌ No |
| **`this` Binding** | Dynamic | Dynamic | Lexical (inherited) | Dynamic |
| **`arguments`** | ✅ Available | ✅ Available | ❌ Not available | ✅ Available |
| **Constructor** | ✅ Can use `new` | ✅ Can use `new` | ❌ Cannot | ❌ Cannot |
| **Best For** | General purpose | Conditional logic | Callbacks, short functions | Object methods |

***

## Nested Functions & Closures

Functions can be defined inside other functions:[10]

```javascript
function outer() {
  let outerVar = "I'm outside!";
  
  function inner() {
    console.log(outerVar);  // Can access outer variables
  }
  
  return inner;
}

const closure = outer();
closure();  // "I'm outside!"
```

**Closure**: Inner function remembers outer function's variables even after outer function completes.

***

## Parameter Passing

### Primitive Types (By Value)

Changes inside function don't affect original:[10]

```javascript
function change(x) {
  x = 10;
}

let num = 5;
change(num);
console.log(num);  // Still 5
```

### Objects/Arrays (By Reference)

Changes to properties/elements are visible outside:[10]

```javascript
function changeObject(obj) {
  obj.name = "Changed";
}

const person = { name: "John" };
changeObject(person);
console.log(person.name);  // "Changed"
```

***

## Special Function Types

### Regular Functions
Standard functions that run to completion:[13]

```javascript
function regularFunc() {
  return "I'm regular";
}
```

### Generator Functions
# JavaScript Generator Functions - Complete Notes

## Basic Definition

**Generator functions** are special functions that can pause execution and resume later, yielding multiple values one at a time.[2][3]

**Syntax**: Use `function*` (with asterisk) to define:[1][5]
```javascript
function* generatorFunc() {
  yield 1;
  yield 2;
  yield 3;
}
```

## Key Keywords

**`function*`**: Declares a generator function (asterisk marks it as special)[4][2]

**`yield`**: A reserved keyword that pauses execution and returns a value. Works like a temporary `return` that remembers its position.[9][2]

## How It Works

### Creating a Generator

When you **call** a generator function, it **doesn't execute immediately**. Instead, it returns a **Generator Object**:[1][4]

```javascript
const gen = generatorFunc();  // Returns generator object, code hasn't run yet
```

### The `next()` Method

Call `next()` to execute code until the next `yield` statement:[3][1]

```javascript
gen.next();  // Returns {value: 1, done: false}
gen.next();  // Returns {value: 2, done: false}
gen.next();  // Returns {value: 3, done: false}
gen.next();  // Returns {value: undefined, done: true}
```

### Return Object Structure

Every `next()` call returns an object with two properties:[4][1]

**`value`**: The yielded value (or `undefined` if finished)[3][1]

**`done`**: Boolean indicating completion status[1][3]
- `false` = more code to execute
- `true` = function finished

## Understanding `done` Property

**`done: false`** means the generator is **paused but not finished**[10][1]

**`done: true`** only appears when the function **completely finishes** (reaches closing `}` or hits `return`)[4][1]

**Important**: After the last `yield`, `done` is still `false` because the function hasn't executed past that yield yet. Only the **next** `next()` call will show `done: true`.[10][1]

```javascript
// After yield 3, generator is paused (done: false)
// Only when next() is called again does it reach the end (done: true)
```

## Real-World Use Cases

### Memory Efficiency
Process large datasets without loading everything into memory:[11][12]
```javascript
function* readLargeFile() {
  // Yield chunks instead of loading entire file
  yield chunk1;
  yield chunk2;
}
```

### Unique ID Generation
Create infinite sequences on-demand:[11][4]
```javascript
function* idGenerator() {
  let id = 0;
  while (true) yield id++;
}
```

### API Pagination
Handle paginated data efficiently:[13][14]
```javascript
function* fetchPages(url) {
  let page = 1;
  while (true) {
    const data = await fetch(`${url}?page=${page++}`);
    yield data;
  }
}
```

### State Machines
Manage multi-step processes (forms, game levels, UI flows)[15][11]

## Iteration Support

Generators work with `for...of` loops because they follow the iterator protocol:[2][4]

```javascript
for (let value of generatorFunc()) {
  console.log(value);  // Prints: 1, 2, 3
}
```

## Key Differences from Normal Functions

| Normal Function | Generator Function |
|----------------|-------------------|
| Returns once | Yields multiple times[2] |
| Executes immediately | Returns generator object first[1] |
| Uses `return` | Uses `yield`[3] |
| Cannot pause | Can pause and resume[2] |
| Single value | Stream of values[2] |

## Important Rules

- `yield` **only works inside** `function*`[16][9]
- Generators **cannot** be called with `new`[5][4]
- Generators **cannot** use arrow functions[5]
- Each generator instance maintains **its own state**[2][4]

## Why Use Generators

**Lazy Evaluation**: Produce values only when needed[12][17]

**State Preservation**: Automatically remember position and variables between calls[18][2]

**Performance**: Reduce memory usage and initial load time[15][11]

**Control Flow**: Fine-grained control over execution timing[11][15]



### Async Functions
Return Promises, can pause with `await`:

```javascript
async function fetchData() {
  const response = await fetch(url);
  return response.json();
}
```

### Async Generator Functions
Combines async and generator features:

```javascript
async function* asyncGenerator() {
  yield await promise1;
  yield await promise2;
}
```

***

## Common Examples

### Simple Calculation
```javascript
function calculateArea(width, height) {
  return width * height;
}

calculateArea(5, 10);  // 50
```

### String Manipulation
```javascript
function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

capitalize("hello");  // "Hello"
```

### Array Processing
```javascript
function getEvenNumbers(arr) {
  return arr.filter(num => num % 2 === 0);
}

getEvenNumbers([1, 2, 3, 4, 5, 6]);  // [2, 4, 6]
```

### Counter (Closure Pattern)
```javascript
function makeCounter() {
  let count = 0;
  return function() {
    return ++count;
  };
}

const counter = makeCounter();
counter();  // 1
counter();  // 2
counter();  // 3
```

***

## Hoisting Behavior

### Function Declaration - Fully Hoisted
```javascript
greet();  // Works! "Hello"

function greet() {
  console.log("Hello");
}
```

### Function Expression - Not Hoisted
```javascript
greet();  // TypeError: greet is not a function

var greet = function() {
  console.log("Hello");
};
```

### Arrow Function - Not Hoisted
```javascript
greet();  // ReferenceError

const greet = () => console.log("Hello");
```

***

## `this` Keyword Differences

### Regular Function - Dynamic `this`
```javascript
const obj = {
  name: "John",
  greet: function() {
    console.log(this.name);  // "John"
  }
};

obj.greet();  // Works correctly
```

### Arrow Function - Lexical `this`
```javascript
const obj = {
  name: "John",
  greet: () => {
    console.log(this.name);  // undefined (inherits outer 'this')
  }
};

obj.greet();  // Doesn't work as expected
```

**Use arrow functions for callbacks:**
```javascript
const obj = {
  name: "John",
  greet: function() {
    setTimeout(() => {
      console.log(this.name);  // "John" - inherits from greet()
    }, 1000);
  }
};
```

***

## When to Use Each Type

### ✅ Use Function Declarations
- General-purpose functions
- When you need hoisting
- Top-level functions in scripts

### ✅ Use Function Expressions
- Conditional function creation
- Functions created in loops
- When you want to prevent hoisting

### ✅ Use Arrow Functions
- Callbacks (setTimeout, map, filter, etc.)
- Short, simple functions
- When you need lexical `this`
- Array methods

### ✅ Use Method Definitions
- Object methods
- Class methods
- When you need dynamic `this`

### ❌ Avoid Arrow Functions
- Object methods (lose correct `this`)
- Functions needing `arguments` object
- Constructors (can't use `new`)
- Event handlers needing dynamic `this`

***

## Best Practices

1. **Use descriptive names**: Function names should describe what they do
2. **Keep functions small**: One function = one task
3. **Use parameters**: Make functions reusable
4. **Return values**: Don't rely on side effects
5. **Add comments**: Explain complex logic
6. **Prefer const**: Declare function expressions with `const`
7. **Use arrow functions for callbacks**: Cleaner syntax
8. **Avoid too many parameters**: Use objects if needed

***

## Key Takeaways

1. **Three main types**: Declaration, Expression, Arrow
2. **Function declarations are hoisted**, expressions are not
3. **Arrow functions have lexical `this`**, regular functions have dynamic `this`
4. **Parameters** = placeholders, **Arguments** = actual values
5. **`return`** sends value back to caller
6. **Functions are first-class citizens** - can be passed around like values
7. **Nested functions create closures** - remember outer variables
8. **Choose the right type** based on use case

[1](https://www.w3schools.com/js/js_comparisons.asp)
[2](https://www.w3schools.com/js/js_functions.asp)
[3](https://www.scholarhat.com/tutorial/javascript/functions-in-javascript)
[4](https://www.geeksforgeeks.org/javascript/different-ways-of-writing-functions-in-javascipt/)
[5](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function)
[6](https://www.geeksforgeeks.org/javascript/javascript-cheat-sheet-a-basic-guide-to-javascript/)
[7](https://www.w3schools.com/js/js_type_conversion.asp)
[8](https://github.com/leonardomso/33-js-concepts)
[9](https://dorey.github.io/JavaScript-Equality-Table/)
[10](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Functions)
[11](https://www.w3schools.com/js/js_arrow_function.asp)
[12](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions)
[13](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions)