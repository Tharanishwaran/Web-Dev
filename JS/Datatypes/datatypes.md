
## What is Hoisting?

Hoisting is JavaScript's behavior of moving all **declarations** to the top of their scope **before** code execution. Only declarations are hoisted, not initializations.[1][2][5][9]

***

## `var` - Hoisting Behavior

**Key Points:**
- Declaration is hoisted to the top of function/global scope[4][5]
- Automatically initialized with `undefined`[2][4]
- Can access before declaration without error[5][1]

**Example:**
```javascript
console.log(x);  // undefined (no error)
var x = 5;
console.log(x);  // 5
```

**What JavaScript actually does:**
```javascript
var x;           // declaration hoisted
console.log(x);  // undefined
x = 5;           // assignment stays in place
console.log(x);  // 5
```

***

## `let` and `const` - Hoisting Behavior

**Key Points:**
- Declaration is hoisted to the top of block scope[1][4]
- **NOT initialized** (no default value)[4][5]
- Creates a **Temporal Dead Zone (TDZ)**[2][1]
- Accessing before declaration throws `ReferenceError`[5][2]

**Example:**
```javascript
console.log(y);  // ReferenceError: Cannot access 'y' before initialization
let y = 10;
```

***

## Temporal Dead Zone (TDZ)

**Definition:** The period between entering a scope and the actual variable initialization where the variable exists but cannot be accessed.[1][2]

**Applies to:** `let` and `const` only (not `var`)[2][1]

**Error message:** `ReferenceError: Cannot access 'variable' before initialization`[4][5]

***

## Function Hoisting

**Function Declarations:**
- Fully hoisted (both declaration and definition)[7][5]
- Can call before declaration[3][7]

```javascript
getName();  // Works! Prints "Hello"

function getName() {
  console.log("Hello");
}
```

**Function Expressions:**
- Only the variable declaration is hoisted, not the function[7][2]
- Behaves like `var` hoisting[5][7]

```javascript
getName();  // TypeError: getName is not a function

var getName = function() {
  console.log("Hello");
};
```

***

## Quick Comparison Table

| Declaration | Hoisted? | Initialized? | Access Before Declaration |
|------------|----------|--------------|---------------------------|
| `var x` | ✅ Yes | ✅ `undefined` | Returns `undefined` |
| `let x` | ✅ Yes | ❌ No | `ReferenceError` (TDZ) |
| `const x` | ✅ Yes | ❌ No | `ReferenceError` (TDZ) |
| `function foo(){}` | ✅ Yes | ✅ Fully | Works normally |
| `var foo = function(){}` | ✅ Yes (var only) | ❌ No | `undefined` (TypeError if called) |

[1][4][5]

***

## Key Takeaways

1. **All declarations are hoisted** - but behavior differs[9][2]
2. **Only declarations move up, not initializations**[9][5]
3. **`var` = hoisted + `undefined`**[4][5]
4. **`let`/`const` = hoisted + TDZ (no access until declaration)**[2][1]
5. **Function declarations = fully hoisted and usable**[7][5]
6. **Always declare variables at the top** to avoid confusion[9]

[1](https://www.w3schools.com/js/js_hoisting.asp)
[2](https://www.geeksforgeeks.org/javascript/javascript-hoisting/)
[3](https://developer.mozilla.org/en-US/docs/Glossary/Hoisting)
[4](https://www.programiz.com/javascript/hoisting)
[5](https://www.greatfrontend.com/questions/quiz/explain-hoisting)
[6](https://www.freecodecamp.org/news/scope-closures-and-hoisting-in-javascript/)
[7](https://namaste-javascript-handbook.vercel.app/docs/lecture-3)
[8](https://www.explainthis.io/en/swe/hoisting)
[9](https://www.digitalocean.com/community/tutorials/understanding-hoisting-in-javascript)


# JavaScript Closure Notes - Quick Reference

## What is a Closure?

A **closure** is a function that retains access to its outer function's variables, even after the outer function has finished executing. It's the combination of a function bundled together with references to its surrounding state (lexical environment).[1][2][3]

***

## Key Concept

A closure is created when:
1. A function is defined inside another function[2][3]
2. The inner function accesses variables from the outer function[5][7]
3. The inner function is returned or used outside the outer function[8][2]

The inner function "remembers" its lexical scope even after the outer function has closed.[7]

***

## Basic Example

```javascript
function outer() {
  let outerVar = "I'm in the outer scope!";
  
  function inner() {
    console.log(outerVar);  // Can access outerVar
  }
  
  return inner;
}

const closure = outer();
closure();  // Output: "I'm in the outer scope!"
```

Even though `outer()` has finished executing, `inner()` still has access to `outerVar`.[3][2]

***

## How It Works - Lexical Scoping

**Lexical scoping** means a function's scope is determined by **where it's defined**, not where it's executed. The inner function maintains a reference to its lexical environment, capturing the outer function's state at creation time.[4][2][3]

***

## Practical Examples

### Counter (Private Variable)

```javascript
function makeCounter() {
  let count = 0;  // Private variable
  
  return function() {
    count++;
    return count;
  };
}

const counter = makeCounter();
console.log(counter());  // 1
console.log(counter());  // 2
console.log(counter());  // 3
```

The `count` variable is private and can only be modified through the returned function.[1][8]

### Function Factory

```javascript
function greeting(message) {
  return function(name) {
    return message + ' ' + name;
  };
}

let sayHi = greeting('Hi');
let sayHello = greeting('Hello');

console.log(sayHi('John'));    // "Hi John"
console.log(sayHello('John')); // "Hello John"
```

Each closure maintains its own separate `message` value.[6][5]

### Event Handlers

```javascript
let countClicked = 0;

myButton.addEventListener('click', function handleClick() {
  countClicked++;
  myText.innerText = `You clicked ${countClicked} times`;
});
```

The `handleClick()` closure captures `countClicked` from its lexical scope.[6]

### Callbacks

```javascript
const message = 'Hello, World!';

setTimeout(function callback() {
  console.log(message);  // Accesses message after delay
}, 1000);
```

The `callback()` is a closure because it captures the `message` variable.[6]

***

## Common Closure Pattern - Private Methods

```javascript
var counter = (function() {
  var privateCounter = 0;
  
  function changeBy(val) {
    privateCounter += val;
  }
  
  return {
    increment: function() {
      changeBy(1);
    },
    decrement: function() {
      changeBy(-1);
    },
    value: function() {
      return privateCounter;
    }
  };
})();

counter.increment();
counter.increment();
console.log(counter.value());  // 2
counter.decrement();
console.log(counter.value());  // 1
```

`privateCounter` and `changeBy()` are private, while `increment()`, `decrement()`, and `value()` are public.[8]

***

## Common Mistake - Closures in Loops with `var`

**Problem:**
```javascript
for (var i = 0; i < 3; i++) {
  setTimeout(function() {
    console.log(i);  // All print 3!
  }, 1000);
}
```

**Why?** All closures share the same `i` reference.[2]

**Solution 1 - Use `let`:**
```javascript
for (let i = 0; i < 3; i++) {
  setTimeout(function() {
    console.log(i);  // Prints 0, 1, 2
  }, 1000);
}
```

`let` creates a new binding for each iteration.[2]

**Solution 2 - Use `forEach`:**
```javascript
[0, 1, 2].forEach(function(i) {
  setTimeout(function() {
    console.log(i);  // Prints 0, 1, 2
  }, 1000);
});
```

***

## Key Characteristics

**Scope Chain Access:** Every closure has access to three scopes:
1. Its own scope (variables defined inside the function)
2. Outer function's variables
3. Global variables[7][6]

**State Preservation:** Outer variables keep their states between multiple calls. The inner function references outer variables (not copies), so changes persist.[8]

**Memory Persistence:** Variables remain in memory as long as the closure exists.[3][2]

---

## When to Use Closures

**Data Privacy:** Create private variables/functions that can't be accessed directly from outside.[1][8]

**Function Factories:** Generate customized functions with preset configuration.[5]

**Callbacks & Event Handlers:** Maintain access to variables in asynchronous operations.[6]

**Module Pattern:** Encapsulate related functionality with private implementation details.[8]

***

## Key Takeaways

1. Closures = Inner function + Outer function's variables[7][2]
2. Inner function "remembers" its lexical environment[4][3]
3. Works even after outer function has closed[1][7]
4. Enables data privacy and encapsulation[1][8]
5. Fundamental to JavaScript patterns like callbacks, event handlers, and modules[6]

[1](https://www.w3schools.com/js/js_function_closures.asp)
[2](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Closures)
[3](https://www.geeksforgeeks.org/javascript/closure-in-javascript/)
[4](https://javascript.info/closure)
[5](https://www.javascripttutorial.net/javascript-closure/)
[6](https://dmitripavlutin.com/javascript-closure/)
[7](https://www.freecodecamp.org/news/javascript-closure-lexical-scope/)
[8](https://www.tutorialsteacher.com/javascript/closure-in-javascript)