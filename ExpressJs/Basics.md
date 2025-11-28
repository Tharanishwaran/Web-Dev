# Express.js 

Express.js is a minimal and flexible Node.js web application framework that simplifies building web applications and APIs by providing an easy-to-use API for routing, middleware, and HTTP utilities. It's built on Node.js for fast and scalable server-side development.[1][2]

## Getting Started

### Installation

First, ensure Node.js and npm are installed on your system. Initialize a new project and install Express:[2]

```bash
npm init -y
npm install express
```

For development convenience, install nodemon to automatically restart your server when files change:

```bash
npm install -g nodemon
```

### Your First Express Application

Create a file named `app.js` with this basic server code:[3][1]

```javascript
const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Welcome to Express.js Tutorial');
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
```

Run the application:

```bash
node app.js
```

Visit `http://localhost:3000` in your browser to see "Welcome to Express.js Tutorial" displayed.[1][2]

## Understanding Core Concepts

### Request and Response Objects

**Request (req):** Contains information about the incoming HTTP request, including query parameters, URL parameters, headers, and body data.[1]

**Response (res):** Used to send responses back to the client with methods like `res.send()`, `res.json()`, `res.render()`, and `res.status()`.[1]

### Routing

Routing defines how your application responds to client requests at specific endpoints (URIs) and HTTP methods. Express provides methods for all HTTP verbs:[4]

```javascript
// GET request
app.get('/users', (req, res) => {
  res.send('Get all users');
});

// POST request
app.post('/users', (req, res) => {
  res.send('Create a new user');
});

// PUT request
app.put('/users/:id', (req, res) => {
  res.send(`Update user with ID: ${req.params.id}`);
});

// DELETE request
app.delete('/users/:id', (req, res) => {
  res.send(`Delete user with ID: ${req.params.id}`);
});
```

### Route Parameters

Capture dynamic values from the URL using route parameters:[4]

```javascript
app.get('/users/:userId/posts/:postId', (req, res) => {
  const { userId, postId } = req.params;
  res.send(`User: ${userId}, Post: ${postId}`);
});
```

## Middleware

Middleware functions have access to the request and response objects and can execute code, modify these objects, end the request-response cycle, or call the next middleware function in the stack.[5][6]

### Application-Level Middleware

Applied to the entire application using `app.use()` and executes for all routes:[5]

```javascript
// Logging middleware
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url} - ${new Date().toISOString()}`);
  next();
});

// Parse JSON bodies
app.use(express.json());

// Parse URL-encoded bodies
app.use(express.urlencoded({ extended: true }));
```

### Router-Level Middleware

Applied to specific router instances, useful for modular applications:[4][5]

```javascript
const express = require('express');
const router = express.Router();

// Middleware specific to this router
router.use((req, res, next) => {
  console.log('Time:', Date.now());
  next();
});

router.get('/', (req, res) => {
  res.send('Birds home page');
});

router.get('/about', (req, res) => {
  res.send('About birds');
});

module.exports = router;
```

Load the router in your main app:

```javascript
const birds = require('./birds');
app.use('/birds', birds);
```

Now the app handles requests to `/birds` and `/birds/about` with the router's middleware.[4]

### Built-in Middleware

Express provides several built-in middleware functions:[6]

```javascript
// Serve static files from 'public' directory
app.use(express.static('public'));

// Parse JSON request bodies
app.use(express.json());

// Parse URL-encoded request bodies
app.use(express.urlencoded({ extended: true }));
```

### Custom Middleware

Create custom middleware for authentication, validation, or other tasks:[7]

```javascript
const verifyUser = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  // Verify token logic here
  next();
};

// Apply to specific routes
app.get('/protected', verifyUser, (req, res) => {
  res.send('Protected content');
});
```

## Project Structure

For scalable applications, organize your code following the MVC (Model-View-Controller) pattern:[8][9]

```
project/
├── src/
│   ├── controllers/      # Route handlers
│   ├── models/           # Database models
│   ├── routes/           # Route definitions
│   ├── middleware/       # Custom middleware
│   ├── config/           # Configuration files
│   └── utils/            # Helper functions
├── public/               # Static files
├── views/                # Template files
├── app.js                # Express app setup
└── server.js             # Server startup
```

## Error Handling

Implement robust error handling to prevent crashes:[8]

```javascript
// 404 handler
app.use((req, res, next) => {
  res.status(404).json({ error: 'Route not found' });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    error: err.message || 'Internal Server Error'
  });
});
```

For async route handlers, use try-catch blocks or async error handling middleware:

```javascript
app.get('/data', async (req, res, next) => {
  try {
    const data = await fetchData();
    res.json(data);
  } catch (error) {
    next(error);
  }
});
```

## Best Practices

**Optimize Middleware Usage:** Apply middleware only where needed to avoid performance overhead. Use router-level middleware for specific route groups.[8]

**Use Async/Await Properly:** Handle asynchronous operations correctly to prevent blocking and improve scalability.[10][8]

**Environment Variables:** Store configuration in environment variables using packages like `dotenv`:[11]

```javascript
require('dotenv').config();
const PORT = process.env.PORT || 3000;
```

**Compression:** Enable gzip compression to reduce response sizes:[10][11]

```javascript
const compression = require('compression');
app.use(compression());
```

**Security:** Use helmet for security headers and validate input data:[11][8]

```javascript
const helmet = require('helmet');
app.use(helmet());
```

**Logging:** Use proper logging libraries like Winston or Morgan instead of console.log.[10][11]

## Building a REST API Example

Here's a complete example of a basic REST API:[1]

```javascript
const express = require('express');
const app = express();

app.use(express.json());

let users = [
  { id: 1, name: 'John' },
  { id: 2, name: 'Jane' }
];

// Get all users
app.get('/api/users', (req, res) => {
  res.json(users);
});

// Get user by ID
app.get('/api/users/:id', (req, res) => {
  const user = users.find(u => u.id === parseInt(req.params.id));
  if (!user) return res.status(404).json({ error: 'User not found' });
  res.json(user);
});

// Create new user
app.post('/api/users', (req, res) => {
  const newUser = {
    id: users.length + 1,
    name: req.body.name
  };
  users.push(newUser);
  res.status(201).json(newUser);
});

// Update user
app.put('/api/users/:id', (req, res) => {
  const user = users.find(u => u.id === parseInt(req.params.id));
  if (!user) return res.status(404).json({ error: 'User not found' });
  user.name = req.body.name;
  res.json(user);
});

// Delete user
app.delete('/api/users/:id', (req, res) => {
  users = users.filter(u => u.id !== parseInt(req.params.id));
  res.status(204).send();
});

app.listen(3000, () => {
  console.log('API running on port 3000');
});
```

## Next Steps

Once you've mastered the basics, explore template engines like EJS or Pug for server-side rendering, integrate databases like MongoDB or PostgreSQL, implement authentication with JWT or Passport.js, and learn about API documentation with Swagger. The official Express.js documentation at expressjs.com provides comprehensive guides and API references.
