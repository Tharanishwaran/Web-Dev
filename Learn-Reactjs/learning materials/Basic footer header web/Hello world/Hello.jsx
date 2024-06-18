import { useState } from 'react';
import './Hello.css';

function Hello() {
  const [message, setMessage] = useState('Hello, World');
  const [msg,setmsg] = useState('hello universe');

  const updateMessage = () => {
    setMessage('You clicked the button!');
  };

  const updateMsg = () => {
    setmsg('You clicked the universe');
  };

  return (
    <div>
      <h1>{message}</h1>
      <button onClick={updateMessage}>Click Me</button>
      
      <h1>{msg}</h1>
      <button onClick={updateMsg}>click</button>
    </div>
  );
}

export default Hello;
