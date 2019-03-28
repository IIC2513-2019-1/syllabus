const http = require('http');
let requestNumber = 0;

const server = http.createServer((req, res) => {
  requestNumber++;
  res.end(`Request number ${requestNumber}`);
});

server.listen(3000, () => {
  console.log('Server running at http://localhost:3000/');
});

