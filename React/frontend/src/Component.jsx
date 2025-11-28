import { useState } from "react";

const Component = () => {
  const [count, setCount] = useState(0); // ✅ Fixed: initialize with 0, correct casing

  const increment = () => {
    setCount(count + 1); // ✅ Fixed: use setCount function properly
    console.log(count); // ⚠️ This will log the OLD value (closure issue)
  };

  return (
    <>
      <p>Count: {count}</p>
      <button onClick={increment}>Increment</button>
    </>
  );
}

export default Component;