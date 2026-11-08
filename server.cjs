const http = require('node:http');
const fs = require('node:fs/promises');
const path = require('node:path');

const server = http.createServer(async (request, response) => {
  if (request.url !== '/') {
    response.writeHead(404).end();
    return;
  }
  try {
    const page = await fs.readFile(path.join(__dirname, 'index.html'));
    response.writeHead(200, {
      'Content-Type': 'text/html; charset=utf-8',
      'Cache-Control': 'no-store',
    }).end(page);
  } catch {
    response.writeHead(500).end('Could not read index.html');
  }
});

server.listen(3000, '127.0.0.1', () => {
  console.log('Workshop: http://127.0.0.1:3000/');
});
