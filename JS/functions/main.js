function add(a,b){

  return a+b

}

console.log(add(1,2))


// function Constructor
const multiply = new Function("x", "y", "return x * y");

console.log(multiply(2,3))

//Arrow Function (ES6)
const square = (x) => x * x;

// Or with explicit return
const square1 = (x) => {
  return x * x;
};

console.log(square(3))
console.log(square1(4))


// Function Expression -- A function stored in a variable:
const multiplyExpression = function(a, b) {
  return a * b;
};

let result = multiplyExpression(4, 3);  // 12

console.log(result)

// Method Definition
const obj = {
  multiply(x, y) {
    return x * y;
  }
};

console.log(obj.multiply(3, 4));  // 12


function greet(name) {
  console.log(`Hello ${name}`);
  // No return statement - returns undefined
}

let result1= greet("John");  // result = undefined


console.log(result1)
greet("ak")


// Generator Functions
function* generatorFunc() {
  yield 1;   // 
  yield 2;
  yield 3;
  return 4
}

const gen = generatorFunc();
console.log(gen.next());  // { value: 1, done: false }
console.log(gen.next());  // { value: 2, done: false }
console.log(gen.next());  // { value: 3, done: false }
console.log(gen.next());
// Async Functions
