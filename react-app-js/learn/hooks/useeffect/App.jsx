import React from 'react'
import { useEffect } from "react";
import { useState } from "react";


function App() {
 
  let [num1,setnum1] = useState(100);
  const [num2,setnum2] = useState(1000);
  

  useEffect(() =>  {

   setnum1(200);
   
   console.log("from useeffect");
 
   return() => {
    
    setnum1(num1 = null);
    console.log(num1);
    console.log("memory cleaned")



   }

   

  }, [num1,num2] );
 
 
 
 console.log(num1)
 
  return (
    
    <div>

    <h1>{num1}</h1>
    <button onClick={() => setnum1((curval) => curval +1 )}>Add</button>  
    
    <h1>{num2}</h1>
    <button onClick={() => setnum2((curval) => curval +1 )}>Add</button>  

    </div>
  )
}

export default App