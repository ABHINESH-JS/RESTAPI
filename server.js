const http = require('http');
const app = require('./app.js');

console.log("//////////////////////////")
const port = process.env.PORT || 3000;
console.log("port",port);
const server = http.createServer(app);
server.listen(port);
