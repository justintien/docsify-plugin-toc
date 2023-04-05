const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 5000;
const DIST_DIR = path.join(__dirname, 'dist');

const server = http.createServer((req, res) => {
  const reqPath = req.url === '/' ? '/index.js' : req.url; // default to serving index.js file
  const filePath = path.join(DIST_DIR, reqPath);
  const contentType = getContentType(filePath);

  fs.readFile(filePath, (err, content) => {
    if (err) {
      res.writeHead(404);
      res.end(`File not found: ${reqPath}`);
    } else {
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content, 'utf-8');
    }
  });
});

server.listen(PORT, () => {
  console.log(`Server listening on port http://localhost:${PORT}`);
});

function getContentType(filePath) {
  const extname = path.extname(filePath);
  switch (extname) {
    case '.js':
      return 'text/javascript';
    case '.css':
      return 'text/css'; // add this case
    default:
      return 'text/plain';
  }
}
