import React, { useState, useCallback } from 'react';

const Parent = () => {
  const [count, setCount] = useState(0);
  
  // ✅ With useCallback - function reference stays the same
  const handleClick = useCallback(() => {
    console.log('Child button clicked');
  }, []); // Empty dependency array
  
  console.log('🔄 Parent rendered');
  
  return (
    <div className="p-5 border-2 border-blue-500 m-2">
      <h2 className="text-xl font-bold">Parent Component</h2>
      <p className="my-2">Count: {count}</p>
      <ExpensiveChild onClick={handleClick} />
      <button 
        onClick={() => setCount(count + 1)}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mt-2"
      >
        Update Parent
      </button>
    </div>
  );
}

const ExpensiveChild = React.memo(({ onClick }) => {
  console.log('🧒 ExpensiveChild RENDERED');
  return (
    <div className="p-3 border-2 border-red-500 m-2">
      <h3 className="text-lg font-semibold">Expensive Child</h3>
      <button 
        onClick={onClick}
        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 mt-2"
      >
        Child Button
      </button>
    </div>
  );
});

export default Parent;