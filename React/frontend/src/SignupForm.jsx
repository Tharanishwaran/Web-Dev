import { useState } from "react";

function SignupForm() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const validateEmail = () => {
    if (!email.includes('@')) {
      setError('Invalid email address');
      return false;
    }
    setError('');
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateEmail()) {
      console.log("Email is valid:", email);
      // Proceed with submit actions
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        onBlur={validateEmail} // Validate on losing focus
        placeholder="Email"
      />
      {error && <span style={{ color: 'red' }}>{error}</span>}
      <button type="submit">Sign Up</button>
    </form>
  );
}

export default SignupForm
