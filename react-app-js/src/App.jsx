import React,{useState} from 'react';

function App() {
  
  let [num, setNum] = useState(1);
  

  const handleAdd = () => {



    setNum((currentval) => {
     
      return currentval + 1;

    });
   
    // setNum( num++);
    // // num = num + 1
  

  };


  return (
    <div>

     <h1>{num}</h1>
     <button onClick={handleAdd}>click to Add</button>


    </div>
  )
}

export default App