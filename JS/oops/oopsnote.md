# OOP in JavaScript — concise study notes

Use this as a quick-reference while practicing. We’ll cover objects, prototypes, classes, encapsulation, inheritance, polymorphism, abstraction, composition, static members, getters/setters, private fields, `Object.create`, and patterns. If you want, tell me your course/goal and I’ll tailor examples.

## 1) JavaScript’s OOP model
- JavaScript is prototype-based; ES6 `class` syntax is sugar over prototypes. You can create objects via literals, constructor functions, classes, or `Object.create`.[3]
- Prototypes provide delegation: if a property/method isn’t found on an object, lookup continues on its prototype chain.[3]

## 2) Creating objects in four common ways
1) Object literal:
```js
const user = { name: "Asha", greet() { return `Hi, I’m ${this.name}`; } };
```
2) Constructor function + prototype:
```js
function Person(name){ this.name = name; }
Person.prototype.greet = function(){ return `Hi, I’m ${this.name}`; };
const p = new Person("Asha");
```
3) ES6 class (sugar over prototypes):
```js
class Person {
  constructor(name){ this.name = name; }
  greet(){ return `Hi, I’m ${this.name}`; }
}
```
4) Object.create (manual prototype):
```js
const animalProto = { speak(){ return `${this.name} makes a sound`; } };
const cat = Object.create(animalProto);
cat.name = "Milo"; cat.speak();
```
Using `Object.create` lets you set an object’s prototype directly.[5]

## 3) Encapsulation (controlling access)
- Goal: hide internal details; expose a clear API.
- Techniques in JS:
  - Convention (underscore), closures, or private class fields `#` (true privacy in modern JS).

Closure-based:
```js
function Counter(){
  let value = 0; // private via closure
  return {
    inc(){ value++; },
    get(){ return value; }
  };
}
```
Private class fields:
```js
class BankAccount {
  #balance;
  constructor(owner, initial){ this.owner = owner; this.#balance = initial; }
  deposit(x){ this.#balance += x; }
  get balance(){ return this.#balance; }
}
```

## 4) Inheritance (is-a) and `super`
```js
class Person { constructor(name){ this.name = name; } greet(){ return `Hi, I’m ${this.name}`; } }
class Student extends Person {
  constructor(name, major){ super(name); this.major = major; }
  study(){ return `${this.name} studies ${this.major}`; }
}
```
- Prototype chain implements inheritance under the hood; subclasses link to parent prototypes.[3]

## 5) Polymorphism (same interface, different behavior)
```js
class Animal { speak(){ return "..."; } }
class Dog extends Animal { speak(){ return "Woof"; } }
class Cat extends Animal { speak(){ return "Meow"; } }
function chorus(list){ return list.map(a => a.speak()); }
```

## 6) Abstraction
- Keep public surface minimal; separate responsibilities (“what” vs “how”). Classes/factories present simple methods; internals can change without breaking users.[2][3]

## 7) Composition vs inheritance
- Prefer composition (has-a) when possible; use inheritance for true subtypes.
```js
class Logger { log(m){ console.log(m); } }
class Service {
  constructor(logger){ this.logger = logger; }
  run(){ this.logger.log("running"); }
}
```

## 8) Static methods/fields
- Belong to the class, not instances.
```js
class MathUtil { static clamp(x,min,max){ return Math.max(min, Math.min(x, max)); } }
MathUtil.clamp(10,0,5); // 5
```

## 9) Getters/Setters
- Property-like access with control/validation.
```js
class Temperature {
  #c; constructor(c){ this.#c = c; }
  get celsius(){ return this.#c; }
  set celsius(v){ if(typeof v!=="number") throw new TypeError(); this.#c = v; }
  get fahrenheit(){ return this.#c * 9/5 + 32; }
}
```

## 10) Prototype details you should know
- Methods defined on `Ctor.prototype` are shared by all instances (memory efficient).
- The `instanceof` operator checks prototype chain membership.
- `Object.getPrototypeOf(obj)` reads an object’s prototype; `Object.setPrototypeOf(obj, proto)` changes it (avoid in hot paths).

## 11) Patterns without classes (factory + delegation)
```js
const canBark = state => ({ bark(){ return `${state.name}: woof`; } });
const canWalk = state => ({ walk(){ state.steps++; return state.steps; } });
function createDog(name){
  const state = { name, steps: 0 };
  return Object.assign({}, canBark(state), canWalk(state));
}
```

## 12) Practical tips and gotchas
- Don’t mix too many patterns in one module; pick class-based or factory-based for clarity.
- Be careful with `this`: arrow functions capture `this` lexically; class methods use dynamic `this` and may need `.bind` when passed as callbacks.
- Prefer small, cohesive classes; avoid deep inheritance trees—reach for composition.
- Use `#private` fields for true privacy; use getters/setters for invariants.

## 13) Mini practice (your turn)
1) Make a base `Shape` with `area()` returning `0`.
2) Implement `Rectangle(width,height)` and `Circle(radius)` that override `area()`.
3) Put them in an array and compute the total area using polymorphism.
- Hint:
```js
class Shape { area(){ return 0; } }
class Rectangle extends Shape { constructor(w,h){ super(); this.w=w; this.h=h; } area(){ return this.w*this.h; } }
class Circle extends Shape { constructor(r){ super(); this.r=r; } area(){ return Math.PI*this.r*this.r; } }
```
Try coding steps 1–3; paste your attempt and I’ll review.

## 14) Further study (authoritative, friendly)
- MDN: OOP in JS—constructors, prototypes, inheritance.[3]
- freeCodeCamp: OOP concepts with JS examples for beginners.[2]
- GeeksforGeeks: Intro to OOP in JS (quick overview).[1]

If you tell me your current project (web app, Node service, game), I’ll design a small OOP exercise that matches it.

[1](https://www.geeksforgeeks.org/javascript/introduction-object-oriented-programming-javascript/)
[2](https://www.freecodecamp.org/news/object-oriented-javascript-for-beginners/)
[3](https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Advanced_JavaScript_objects/Object-oriented_programming)
[4](https://javascript.info)
[5](https://dev.to/merudra754/the-complete-guide-to-oop-in-javascript-2lk0)
[6](https://www.honeybadger.io/blog/javascript-oop/)
[7](https://www.youtube.com/watch?v=GEuS0tfLfEY)
[8](https://www.w3schools.com/js/js_classes.asp)
[9](https://www.simplilearn.com/tutorials/javascript-tutorial/oop-in-javascript)