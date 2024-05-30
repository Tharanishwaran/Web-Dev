import User from "./User";

function App() {



  const userData = {

   name : "akash",
   age : 20,


  };

  return (
  
  <div>
  <h1>App hello</h1>
  <User 
  
  Name = {userData.name} 
  Age={userData.age}
  
  />
  
  </div>
  );

}

export default App;


// export function Hello() { //components always must return tags

//   return <h1>Akash ak</h1>;
   
//  }



//  export function Hey() {
  
//   return <h1>hey hitler</h1>

//  }

//  export default App;
