const myPromise = new Promise((resolve, reject) => {
    let success = false;
  
    if (success) {
      resolve("✅ Task completed!");
    } else {
      reject("❌ Task failed!");
    }
  });


  myPromise.then((result) => {
    console.log(result);
  });
  
  myPromise.catch((error) => {
    console.log(error);
  });