setTimeout( function() {
    console.log("10  program was end");
}, 10000);

console.log("program was start");


for (let i = 0; i <= 9; i++) {
    setTimeout(() => {
      console.log("Number:", i);
    }, i * 1000); // 1000 ms = 1 second per iteration
  }
  

