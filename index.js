const fs = require('fs');
const http = require('http');
const url = require('url');

// Function to handle incoming requests
function handleRequest(request, response) {
  // Get the user's information
  const userInfo = {
    ip: request.headers['x-forwarded-for'] || request.connection.remoteAddress,
    userAgent: request.headers['user-agent'],
    timestamp: new Date().toISOString(),
    url: request.url,
  };

  // Save the user's information to a file
  fs.appendFile("C:\Users\olive\OneDrive\Skrivbord\users data.txt", JSON.stringify(userInfo) + '\n', (err) => {
    if (err) {
      console.error('Error writing to file:', err);
    } else {
      console.log('User information logged successfully!');
    }
  });

  // Respond to the user's request
  response.writeHead(200, { 'Content-Type': 'text/plain' });
  response.end('Hello, thanks for visiting!');
}

// Start the server
const server = http.createServer(handleRequest);
const port = 3000;

server.listen(port, () => {
  console.log(`Server is running and listening on port ${port}`);
});
