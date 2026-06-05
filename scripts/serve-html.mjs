import { createServer } from 'http';
import { readFileSync } from 'fs';
const html = readFileSync('DEPLOY.html');
createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
  res.end(html);
}).listen(9876, () => console.log('READY on http://localhost:9876'));
