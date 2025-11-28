//Middleware are functions that execute during 
// the request-response cycle. 
// They have access to the request object (req), response object (res), 
// and the next function.​

// Think of middleware as a chain of checkpoints that a request passes through before reaching your route handler

const express = require('express');
const app = express();



// Middleware function
const logger = (req, res, next) => {

   console.log(`${req.method} ${req.url}`);
   next(); // pass control to the next middleware function

};

// Use the middleware function
app.use(logger);

app.get('/', (req, res) => {
   res.send('Home page');
});

app.listen(3000, () => {
   console.log('Server listening on port 3000');
});


// Step 1: Basic Middleware Structure
// Every middleware function has three parameters:
function myMiddleware(req, res, next) {
   // Do something here
   next(); // Pass control to the next middleware
 }
 




