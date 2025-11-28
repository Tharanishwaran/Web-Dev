import { useState,useMemo } from 'react';

export function Counterusememo() {
  const [count, setCount] = useState(0);
  const [name, setName] = useState('');

//   // This function runs on EVERY render!
//   function doubleCount() {
//     console.log('Calculating double...');
//     return count * 2;
//   }

//   const result = doubleCount(); // Runs every time!

const result = useMemo(() => {

    console.log('calculating double...');

    return count * 2;

}, [count]) // ← "Only recalculate if count changes"

  return (
    <div>
      <h1>Count: {count}</h1>
      <h2>Double: {result}</h2>
      
      <button onClick={() => setCount(count + 1)}>Increment</button>
      
      {/* When you type here, doubleCount() runs unnecessarily! */}
      <input 
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Type your name"
      />
      <h1>my name is {name}</h1>
    </div>
  );
}
