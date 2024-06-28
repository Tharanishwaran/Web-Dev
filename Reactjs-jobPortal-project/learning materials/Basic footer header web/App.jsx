import Header from "./Header";
import Footer from "./Footer";
import Food from "./Food";


function App() {
  return (
   
    //we use Using a Fragment for return multiple componet: A common approach is to wrap the components in a React.Fragment or shorthand <>...</> to group them together without adding extra nodes to the DOM.
    <>

   <Header /> 
   <Food /> 
   <Footer />
   


   </>


  );
}


export default App;