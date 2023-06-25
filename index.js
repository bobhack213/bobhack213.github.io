const express = require('express');
const fs = require('fs');

const app = express();
const port = 3000;

app.get('/', (req, res) => {
  const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  const timestamp = new Date().toISOString();
  
  // Save the IP address and timestamp to a file
  fs.appendFile('ip_log.txt', `IP: ${ip} - Timestamp: ${timestamp}\n`, (err) => {
    if (err) {
      console.error('Error writing to file:', err);
    }
  });

  res.send('IP has been logged!');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
