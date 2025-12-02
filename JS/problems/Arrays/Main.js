// map
let number = [1,2,3,4]
console.log(number)
let doubled = number.map(num => num * 2);
console.log(doubled)

// filter Creates a new array with elements that pass a test
let numbers = [1,2,3,4,5]
let evenNumbers = numbers.filter(num => num % 2 == 0)
console.log(evenNumbers)

// reduce() - Combine to Single Value - Most powerful method - calculates sum, finds max, counts, etc.
let numbers1 = [1,2,3,4]
let sum = numbers1.reduce((total,num) => total + num, 10)
console.log(sum)

//count occurences
let fruits = ['apple','banana','apple','orange']
let count = fruits.reduce((acc,fruit)=> {
    acc[fruit] = (acc[fruit] || 0) +1 ;
    return acc;
}, {});
console.log(count)

// 4. find() - Get First Matching Element
// Returns the first element that passes the test
let numbers2 = [1,2,3,4,5]
let found = numbers2.find(num => num > 3);
console.log(found)

// 5. findIndex() - Get Index of First Match
let users = [{name: 'John', age: 30}, {name: 'Jane', age: 25}];
let index = users.findIndex(user => user.name === 'Jane');
console.log(index); // 1

// 6. forEach() - Loop Through Array

let fruits1 = ['apple', 'banana', 'cherry'];
fruits1.forEach((fruit, index) => {
  console.log(`${index}: ${fruit}`);
});
// 0: apple
// 1: banana
// 2: cherry


let arr = [1, 2, 2, 3, 4, 4];
let unique = [...new Set(arr)];
console.log(unique); // [1, 2, 3, 4]
