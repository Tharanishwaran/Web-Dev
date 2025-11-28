import { useNavigate } from 'react-router-dom';

function LoginForm() {
  const navigate = useNavigate();
  
  const handleLogin = (e) => {
    e.preventDefault();
    // After successful login
    navigate('/dashboard'); // Redirect to dashboard
  };
  
  return (
    <form onSubmit={handleLogin}>
      <input type="email" placeholder="Email" />
      <input type="password" placeholder="Password" />
      <button type="submit">Login</button>
    </form>
  );
}

export default LoginForm