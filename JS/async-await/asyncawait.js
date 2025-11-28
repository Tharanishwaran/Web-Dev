// // Async/await is a newer, cleaner way to work with Promises. 
// // It makes asynchronous code look like regular synchronous code - Think of it as "promise chaining but prettier"


// // The async Keyword - Put async before a function to make it return a Promise automatically:

// async function myfunction(){

//       return "hello";

// }




// myfunction().then(function(value) {

//  console.log(value)

// });

// // The await Keyword
// // await pauses the function until a Promise resolves:​
// // Key Rule: await can only be used inside async functions.​
// async function myFunction1() {
//     let promise = new Promise(function(resolve) {
//       setTimeout(function() {
//         resolve("Done!");
//       }, 2000);
//     });
    
//     let result = await promise;  // Wait here for 2 seconds
//     console.log(result);         // Then print "Done!"
//   }
  
//   myFunction1(); 
 


// // Comparing Promises vs Async/Await
// // With Promises (.then chain):
// function fetchUser() {
//     getUserData(1)
//       .then(function(user) {
//         console.log(user.name);
//         return getPosts(user.id);
//       })
//       .then(function(posts) {
//         console.log(posts);
//       })
//       .catch(function(error) {
//         console.log(error);
//       });
//   }

  
// //   With Async/Await (cleaner!):
// async function fetchUser() {
//     try {
//       let user = await getUserData(1);
//       console.log(user.name);
      
//       let posts = await getPosts(user.id);
//       console.log(posts);
      
//     } catch (error) {
//       console.log(error);
//     }
//   }
  

// Regular function
function regularFunc() {
  return "Hello";
}
console.log(regularFunc());  // "Hello" (immediately)

// Async function
function asyncFunc() {
  let p = 10
  for (let index = 0; index < 10; index++) {
          
           setTimeout(() => {
          console.log(index);
            
           }, 100);
    
  }
  return p;
}
// console.log(asyncFunc());  // Promise { <pending> }
console.log("hello bro" )
// asyncFunc().then(result => console.log(result));  // "Hello" (later)

function longTask() {
  // Simulate a heavy task (blocking)
  for (let i = 0; i < 1e10; i++) {} 
  console.log("Done long task");
}

console.log("Start");
longTask();
console.log("End");
