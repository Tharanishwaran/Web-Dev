# React Router - Complete Navigation Guide

***

## Overview
React Router enables navigation between different views in Single Page Applications (SPAs) without full page reloads. Essential for building multi-page React apps like social media platforms, blogs, and dashboards.[1][3]

---

## Installation

```bash
npm install react-router-dom
```

***

## Basic Setup

### Step 1: Wrap App with BrowserRouter

```javascript
// main.jsx or index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
```

### Step 2: Define Routes in App Component

```javascript
// App.jsx
import { Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';

function App() {
  return (
    <div>
      {/* Navigation Bar */}
      <nav className="bg-blue-600 p-4">
        <ul className="flex gap-6 text-white">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/contact">Contact</Link></li>
        </ul>
      </nav>

      {/* Route Definitions */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </div>
  );
}

export default App;
```

### Step 3: Create Page Components

```javascript
// pages/Home.jsx
function Home() {
  return (
    <div>
      <h1>Home Page</h1>
      <p>Welcome to the home page!</p>
    </div>
  );
}

export default Home;

// pages/About.jsx
function About() {
  return (
    <div>
      <h1>About Page</h1>
      <p>Learn more about us here.</p>
    </div>
  );
}

export default About;

// pages/Contact.jsx
function Contact() {
  return (
    <div>
      <h1>Contact Page</h1>
      <p>Get in touch with us!</p>
    </div>
  );
}

export default Contact;
```

***

## Core Components

### 1. BrowserRouter
Wraps entire app to enable routing functionality.[3][7]

### 2. Routes
Container for all route definitions.[3]

### 3. Route
Maps URL path to a component:[3]
```javascript
<Route path="/about" element={<About />} />
```

### 4. Link
Creates navigation links without page reload:[3]
```javascript
// ✅ Correct - No page reload
<Link to="/about">About</Link>

// ❌ Wrong - Full page reload
<a href="/about">About</a>
```

***

## Advanced Features

### Dynamic Routes (URL Parameters)

Access dynamic values from the URL:[2]

```javascript
// App.jsx
import UserProfile from './pages/UserProfile';

<Routes>
  <Route path="/users/:userId" element={<UserProfile />} />
  <Route path="/posts/:postId" element={<PostDetail />} />
</Routes>

// pages/UserProfile.jsx
import { useParams } from 'react-router-dom';

function UserProfile() {
  const { userId } = useParams(); // Extract userId from URL
  
  return (
    <div>
      <h1>User Profile</h1>
      <p>Viewing user: {userId}</p>
    </div>
  );
}

export default UserProfile;
```

**Example URLs:**
- `/users/123` → userId = "123"
- `/posts/456` → postId = "456"

### Programmatic Navigation (useNavigate)

Navigate from JavaScript code instead of clicking links:[10]

```javascript
import { useNavigate } from 'react-router-dom';

function LoginForm() {
  const navigate = useNavigate();
  
  const handleLogin = (e) => {
    e.preventDefault();
    // Validate credentials
    const isValid = true; // Replace with actual validation
    
    if (isValid) {
      navigate('/dashboard'); // Redirect after login
    }
  };
  
  const goBack = () => {
    navigate(-1); // Go back one page in history
  };
  
  return (
    <form onSubmit={handleLogin}>
      <input type="email" placeholder="Email" />
      <input type="password" placeholder="Password" />
      <button type="submit">Login</button>
      <button onClick={goBack}>Go Back</button>
    </form>
  );
}
```

### Nested Routes (Layouts)

Routes inside other routes for shared layouts:[11]

```javascript
// App.jsx
import { Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Settings from './pages/Settings';
import Profile from './pages/Profile';

function App() {
  return (
    <Routes>
      <Route path="/dashboard" element={<Dashboard />}>
        <Route path="settings" element={<Settings />} />
        <Route path="profile" element={<Profile />} />
      </Route>
    </Routes>
  );
}

// pages/Dashboard.jsx
import { Outlet, Link } from 'react-router-dom';

function Dashboard() {
  return (
    <div>
      <h1>Dashboard</h1>
      
      {/* Sidebar navigation */}
      <nav>
        <Link to="settings">Settings</Link>
        <Link to="profile">Profile</Link>
      </nav>
      
      {/* Child routes render here */}
      <Outlet />
    </div>
  );
}

export default Dashboard;
```

**URLs:**
- `/dashboard/settings` → Shows Dashboard with Settings
- `/dashboard/profile` → Shows Dashboard with Profile

### 404 Page (Catch-All Route)

Handle unknown routes:

```javascript
import NotFound from './pages/NotFound';

<Routes>
  <Route path="/" element={<Home />} />
  <Route path="/about" element={<About />} />
  
  {/* Catch all unmatched routes */}
  <Route path="*" element={<NotFound />} />
</Routes>

// pages/NotFound.jsx
import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <div className="text-center mt-20">
      <h1 className="text-6xl font-bold">404</h1>
      <p className="text-xl mt-4">Page Not Found</p>
      <Link to="/" className="text-blue-600 underline mt-4">
        Go Home
      </Link>
    </div>
  );
}

export default NotFound;
```

***

## Real-World Example: Blog Application

```javascript
// App.jsx
import { Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import PostList from './pages/PostList';
import PostDetail from './pages/PostDetail';
import CreatePost from './pages/CreatePost';
import NotFound from './pages/NotFound';

function App() {
  return (
    <div>
      {/* Navigation stays on all pages */}
      <nav className="bg-gray-800 text-white p-4">
        <div className="container mx-auto flex gap-6">
          <Link to="/" className="hover:text-blue-400">Home</Link>
          <Link to="/posts" className="hover:text-blue-400">Posts</Link>
          <Link to="/create" className="hover:text-blue-400">Create Post</Link>
        </div>
      </nav>

      {/* Page content changes based on route */}
      <div className="container mx-auto p-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/posts" element={<PostList />} />
          <Route path="/posts/:id" element={<PostDetail />} />
          <Route path="/create" element={<CreatePost />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
```

```javascript
// pages/PostList.jsx
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

function PostList() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then(res => res.json())
      .then(data => setPosts(data.slice(0, 10)));
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">All Posts</h1>
      <div className="space-y-4">
        {posts.map(post => (
          <div key={post.id} className="border p-4 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
            <p className="text-gray-600 mb-3">{post.body.slice(0, 100)}...</p>
            <Link 
              to={`/posts/${post.id}`} 
              className="text-blue-600 hover:underline"
            >
              Read More →
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PostList;
```

```javascript
// pages/PostDetail.jsx
import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

function PostDetail() {
  const { id } = useParams(); // Get post ID from URL
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
      .then(res => res.json())
      .then(data => {
        setPost(data);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (!post) return <p>Post not found</p>;

  return (
    <div>
      <button 
        onClick={() => navigate('/posts')}
        className="mb-6 text-blue-600 hover:underline"
      >
        ← Back to Posts
      </button>
      
      <article>
        <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
        <p className="text-gray-700 text-lg leading-relaxed">{post.body}</p>
      </article>
    </div>
  );
}

export default PostDetail;
```

***

## Important Hooks

### useParams()
Extract URL parameters:
```javascript
const { userId, postId } = useParams();
```

### useNavigate()
Programmatic navigation:
```javascript
const navigate = useNavigate();
navigate('/home'); // Go to /home
navigate(-1); // Go back
navigate(1); // Go forward
```

### useLocation()
Get current location object:
```javascript
import { useLocation } from 'react-router-dom';

const location = useLocation();
console.log(location.pathname); // Current path
```

***

## Folder Structure

```
src/
├── pages/
│   ├── Home.jsx
│   ├── About.jsx
│   ├── Contact.jsx
│   ├── PostList.jsx
│   ├── PostDetail.jsx
│   └── NotFound.jsx
├── App.jsx
└── main.jsx
```

***

## Best Practices

1. **Use Link over <a>** - Prevents full page reloads[3]
2. **Unique keys for dynamic routes** - Use IDs from data, not array indexes
3. **404 route at the end** - Catch unmatched routes with `path="*"`
4. **Organize by feature** - Group related pages in folders
5. **Protected routes** - Check authentication before rendering sensitive pages

***

## Common Patterns for Social Media App

```javascript
<Routes>
  <Route path="/" element={<Feed />} />
  <Route path="/login" element={<Login />} />
  <Route path="/profile/:userId" element={<Profile />} />
  <Route path="/post/:postId" element={<PostDetail />} />
  <Route path="/settings" element={<Settings />} />
  <Route path="/notifications" element={<Notifications />} />
  <Route path="*" element={<NotFound />} />
</Routes>
```

***

## Key Takeaways

✅ React Router enables multi-page navigation without reloads  
✅ `<Link>` for navigation, `<Routes>` and `<Route>` for mapping paths  
✅ `useParams()` for dynamic URL parameters  
✅ `useNavigate()` for programmatic navigation  
✅ Nested routes with `<Outlet>` for shared layouts  
✅ Catch-all routes with `path="*"` for 404 pages  

**Next Topics:** Context API, Custom Hooks, Form Handling
