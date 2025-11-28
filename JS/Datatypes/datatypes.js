function print() {

    var a1 = 10;
    console.log(a1); // ✅ 10
    
}

if (true) {
    var a = 10;   // function-scoped
    let b = 20;   // block-scoped
    const c = 30; // block-scoped
}
// console.log(a); // ✅ 10
// console.log(b); // ❌ ReferenceError
// console.log(c); // ❌ ReferenceError


// console.log(a1) // ❌ ReferenceError becuase of a1 was decalred in function scop

// var x
// var x = 10
// var x = 13
// console.log(x); // ✅ undefined (due to var hoisting)


let y = 5
 y = 7
console.log(y); // ❌ ReferenceError (TDZ)
// let y = 10;

// const z
// console.log(z); // ❌ ReferenceError (TDZ)
// const z = 15;


//let
// Block-scoped - Only accessible within the block where it's declared​

// Can be reassigned - You can change its value later​

// Cannot be redeclared - Can't declare the same variable name twice in the same scope​​

// Must be initialized before use - No hoisting like var​

