import { useState } from 'react';
import './Hello.css';

function Hello() {
  const [message, setMessage] = useState('Hello, World');

  const updateMessage = () => {
    setMessage('You clicked the button!');
  };

  return (
    <div>
      <h1>{message}</h1>
      <button onClick={updateMessage}>Click Me</button>
    </div>
  );
}

export default Hello;
