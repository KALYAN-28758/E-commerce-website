const http = require('http');
const options = { hostname: 'localhost', port: 5000, path: '/api/products', method: 'GET', headers: { 'Content-Type': 'application/json' } };
const req = http.request(options, res => {
  console.log('status', res.statusCode);
  let body = '';
  res.on('data', chunk => body += chunk);
  res.on('end', () => {
    console.log('body', body);
  });
});
req.on('error', err => console.error('error', err.message));
req.end();