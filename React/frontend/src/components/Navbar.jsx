// components/Navbar.jsx
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

function Navbar() {
  const { isAuthenticated, user } = useAuth(); // Access auth state

  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="flex justify-between items-center">
        <Link to="/">Home</Link>
        
        {isAuthenticated ? (
          <div className="flex gap-4 items-center">
            <span>Hello, {user.name}</span>
            <Link to="/profile">Profile</Link>
          </div>
        ) : (
          <Link to="/login">Login</Link>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
