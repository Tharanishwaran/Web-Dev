import React, { useState, useRef } from 'react';

export const Component = () => {
  const [count, setCount] = useState(0);
  const renderCount = useRef(0);

  // Count renders without causing re-renders
  renderCount.current++;
  
  console.log(`Component rendered ${renderCount.current} times`);

  return (
    <div className="p-4 border-2 border-blue-500">
      <p>Count: {count}</p>
      <p>Renders: {renderCount.current}</p>
      <button 
        onClick={() => setCount(count + 1)}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Update Count (causes re-render)
      </button>
    </div>
  );
};