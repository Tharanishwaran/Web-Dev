// Input: [3, 67, 15, 98, 23]
// Output: 98

// Solution 1: Using Math.max
function findLargest(arr) {
  return Math.max(...arr);
}

// Solution 2: Using reduce
function findLargest(arr) {
  return arr.reduce((max, num) => num > max ? num : max, arr[0]);
}
