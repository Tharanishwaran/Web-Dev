const http = require('http');

// Create the server
const server = http.createServer((req, res) => {

    const url = req.url;

    if (url === '/') {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end('<hl>Hello from Node.js server!</h1>');
        return;
    }
    else if(url === '/about') {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end('<hl>This is the about page</h1>');
        return;
    }

    else if(url === '/contact') {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end('<hl>This is the contact page</h1>');
        return;
    }

    else if(url === '/api/data') {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'API response',status: 'success'}));
        
    }
    else {
        res.writeHead(404, { 'Content-Type': 'text/html' });
        res.end('<hl>Page not found</h1>');
        
    }
});

// Start listening on port 3000
server.listen(3000, () => {
    console.log('Server running at http://localhost:3000/');
});
