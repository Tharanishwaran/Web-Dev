let promise = new Promise(function(resolve,reject) {
//do some work here 

let success = true;

if(false) {
  resolve("task completed");
} else {
  reject("task failed");
}

    

});

promise
.then(function(data) {
  console.log(data);
})
.catch(function(error) {
  console.log(error);
});


//real example

let mypromise = new Promise(function(resolve, reject) {

  let x = 5;
  let y = 5;

  if (x ==y ) {

     resolve("number is equal");  
  } else {
    reject("number is not equal");
    
  }
   

});

mypromise   
.then(function(data) {
  console.log(data);
})
.catch(function(error) {
  console.log(error);
});

// Promise Chaining in Detail
//Each .then() can return a value, which gets passed to the next .then():
let newpromise = new Promise(function(resolve) {
  resolve(5);
});

newpromise
  .then(function(value) {
    console.log(value);      // Prints: 5
    return value * 2;        // Pass 10 to next .then()
  })
  .then(function(value) {
    console.log(value);      // Prints: 10
    return value + 3;        // Pass 13 to next .then()
  })
  .then(function(value) {
    console.log(value);      // Prints: 13
  });


  // Real-World Promise Example: Fetching Data

  // Simulate fetching user data
function getUserData(userId) {
  return new Promise(function(resolve, reject) {
    // Simulate 2-second delay
    setTimeout(function() {
      if (userId > 0) {
        resolve({ id: userId, name: "Rahul" });
      } else {
        reject("Invalid user ID");
      }
    }, 2000);
  });
}

// Use the promise
getUserData(1)
  .then(function(user) {
    console.log("User found:", user.name);
    return user.id;
  })
  .then(function(userId) {
    console.log("User ID:", userId);
  })
  .catch(function(error) {
    console.log("Error:", error);
  });
