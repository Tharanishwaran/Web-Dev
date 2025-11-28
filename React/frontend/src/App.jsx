import { useState, useCallback } from 'react';
import SignupForm from './SignupForm';
import Component from './Component';

function App() {
  const [count, setCount] = useState(0);
  const [name, setName] = useState('');

  // Function is created ONCE and saved
  const handleClick = useCallback(() => {
    alert('Button clicked!');
  }, []); // Empty array = never recreate


  

  return (
    <div>
      <input className='ring'
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button onClick={handleClick}>Click me</button>
      <div className='pt-8'></div>
      < SignupForm></SignupForm>
      
      <Component></Component>
    </div>
  );
}

export default App;