// Load the built-in HTTP module
const http = require('http');

// Create a server
const server = http.createServer((req, res) => {
  res.statusCode = 200; // success code
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello, World!'); // response text
});

// Make server listen on port 3000
server.listen(3000, () => {
  console.log('Server running at http://localhost:3000/');
});
