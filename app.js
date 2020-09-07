const express = require('express');
const app = express();

app.listen(process.env.PORT || 3000);

// For convert stream request data to json object 
// If you remove this then you can't get data in request body
app.use(express.json());

// Add all routes from app route file
const appRoute = require('./routes/app.route');
app.use('/api', appRoute);

// Add user routes
// const user = require('./routes/user.route');
// const userDetail = require('./routes/user-detail.route');
// app.use('/user', user);
// app.use('/user-detail', userDetail);

// const http = require('http');

// const hostname = '127.0.0.1';
// const port = 3000;

// const server = http.createServer((req, res) => {
//   res.statusCode = 200;
//   res.setHeader('Content-Type', 'text/plain');
//   res.end('Hello World');
// });

// server.listen(port, hostname, () => {
//   console.log(`Server running at http://${hostname}:${port}/`);
// });
