function Lists(){


 const fruits = ["apple","bannana","orange"]

 fruits.sort

 const listems = fruits.map(fruit => <li>{fruit}</li>)

 return(
 
<ul>{listems}</ul>

 );

}


export default Lists;