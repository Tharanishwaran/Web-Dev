## Critical Methods (Must Master These)

### 1. **map()** - Transform Each Element
Creates a new array by applying a function to each element.[2][1]
```javascript
let numbers = [1, 2, 3, 4];
let doubled = numbers.map(num => num * 2);
console.log(doubled); // [2, 4, 6, 8]
```

### 2. **filter()** - Select Elements by Condition
Creates a new array with elements that pass a test.[4][1]
```javascript
let numbers = [1, 2, 3, 4, 5];
let evenNumbers = numbers.filter(num => num % 2 === 0);
console.log(evenNumbers); // [2, 4]
```

### 3. **reduce()** - Combine to Single Value
Most powerful method - calculates sum, finds max, counts, etc.[2]
```javascript
let numbers = [1, 2, 3, 4];
let sum = numbers.reduce((total, num) => total + num, 0);
console.log(sum); // 10

// Count occurrences
let fruits = ['apple', 'banana', 'apple', 'orange'];
let count = fruits.reduce((acc, fruit) => {
  acc[fruit] = (acc[fruit] || 0) + 1;
  return acc;
}, {});
console.log(count); // {apple: 2, banana: 1, orange: 1}
```

### 4. **find()** - Get First Matching Element
Returns the first element that passes the test.[1][4]
```javascript
let numbers = [1, 2, 3, 4, 5];
let found = numbers.find(num => num > 3);
console.log(found); // 4 (first number > 3)
```

### 5. **findIndex()** - Get Index of First Match
```javascript
let users = [{name: 'John', age: 30}, {name: 'Jane', age: 25}];
let index = users.findIndex(user => user.name === 'Jane');
console.log(index); // 1
```

### 6. **forEach()** - Loop Through Array
Executes function for each element.[4][1]
```javascript
let fruits = ['apple', 'banana', 'cherry'];
fruits.forEach((fruit, index) => {
  console.log(`${index}: ${fruit}`);
});
// 0: apple
// 1: banana
// 2: cherry
```

## Modify Original Array

### 7. **push()** - Add to End
```javascript
let arr = [1, 2, 3];
arr.push(4);
console.log(arr); // [1, 2, 3, 4]
```

### 8. **pop()** - Remove from End
```javascript
let arr = [1, 2, 3, 4];
let removed = arr.pop();
console.log(arr); // [1, 2, 3]
console.log(removed); // 4
```

### 9. **shift()** - Remove from Start
```javascript
let arr = [1, 2, 3];
let first = arr.shift();
console.log(arr); // [2, 3]
console.log(first); // 1
```

### 10. **unshift()** - Add to Start
```javascript
let arr = [2, 3];
arr.unshift(1);
console.log(arr); // [1, 2, 3]
```

### 11. **splice()** - Add/Remove at Any Position
Very versatile method.[1][4]
```javascript
let fruits = ['apple', 'banana', 'cherry'];
// Remove 1 item at index 1, add 'mango'
fruits.splice(1, 1, 'mango', 'grape');
console.log(fruits); // ['apple', 'mango', 'grape', 'cherry']
```

## Search & Check

### 12. **includes()** - Check if Element Exists
```javascript
let arr = [1, 2, 3];
console.log(arr.includes(2)); // true
console.log(arr.includes(5)); // false
```

### 13. **indexOf()** - Find Index of Element
```javascript
let arr = ['a', 'b', 'c', 'b'];
console.log(arr.indexOf('b')); // 1 (first occurrence)
console.log(arr.indexOf('z')); // -1 (not found)
```

### 14. **some()** - Check if Any Element Passes Test
```javascript
let numbers = [1, 2, 3, 4];
let hasEven = numbers.some(num => num % 2 === 0);
console.log(hasEven); // true
```

### 15. **every()** - Check if All Elements Pass Test
```javascript
let numbers = [2, 4, 6];
let allEven = numbers.every(num => num % 2 === 0);
console.log(allEven); // true
```

## Sorting & Ordering

### 16. **sort()** - Sort Array (IMPORTANT!)
Must use compare function for numbers.[1]
```javascript
let numbers = [10, 2, 30, 4];
// WRONG for numbers
numbers.sort(); // [10, 2, 30, 4] - treats as strings!

// CORRECT for numbers
numbers.sort((a, b) => a - b); // [2, 4, 10, 30]
numbers.sort((a, b) => b - a); // [30, 10, 4, 2] - descending
```

### 17. **reverse()** - Reverse Array Order
```javascript
let arr = [1, 2, 3];
arr.reverse();
console.log(arr); // [3, 2, 1]
```

## Combining & Slicing

### 18. **concat()** - Merge Arrays
```javascript
let arr1 = [1, 2];
let arr2 = [3, 4];
let merged = arr1.concat(arr2);
console.log(merged); // [1, 2, 3, 4]
```

### 19. **slice()** - Extract Portion (doesn't modify original)
```javascript
let arr = [1, 2, 3, 4, 5];
let sliced = arr.slice(1, 3); // from index 1 to 3 (excluding 3)
console.log(sliced); // [2, 3]
console.log(arr); // [1, 2, 3, 4, 5] - unchanged
```

### 20. **join()** - Convert to String
```javascript
let arr = ['Hello', 'World'];
console.log(arr.join(' ')); // "Hello World"
console.log(arr.join('-')); // "Hello-World"
```

## Advanced (Nice to Know)

### 21. **flat()** - Flatten Nested Arrays
```javascript
let nested = [1, [2, 3], [4, [5, 6]]];
console.log(nested.flat()); // [1, 2, 3, 4, [5, 6]]
console.log(nested.flat(2)); // [1, 2, 3, 4, 5, 6]
```

### 22. **fill()** - Fill Array with Value
```javascript
let arr = new Array(5).fill(0); // Create array with five 0s
console.log(arr); // [0, 0, 0, 0, 0]
```

### 23. **Array.from()** - Create Array from Iterable
```javascript
let str = 'hello';
let chars = Array.from(str);
console.log(chars); // ['h', 'e', 'l', 'l', 'o']
```

## Interview Tricks

**Remove Duplicates**:[1]
```javascript
let arr = [1, 2, 2, 3, 4, 4];
let unique = [...new Set(arr)];
console.log(unique); // [1, 2, 3, 4]
```

**Filter Falsy Values**:[1]
```javascript
let arr = [0, 1, false, 2, '', 3, null];
let truthy = arr.filter(Boolean);
console.log(truthy); // [1, 2, 3]
```

**Sort Objects by Property**:[1]
```javascript
let users = [
  {name: 'John', age: 30},
  {name: 'Jane', age: 25}
];
users.sort((a, b) => a.age - b.age);
```

Focus on mastering **map, filter, reduce, find, sort, splice** - these solve 80% of interview problems.[2][1]
