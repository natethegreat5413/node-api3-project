const express = require('express');
const userRouter = require('./users/userRouter')
const helmet = require('helmet')

const server = express();

server.use(express.json())
server.use(helmet())
server.use(logger)
server.use('/api/users', userRouter)


server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

//custom middleware

function logger(req, res, next) {
  console.log(`${req.url} ${req.method} ${new Date().toISOString()}`)

  next()
}

module.exports = server;





// const express = require('express');

// const userRouter = require("./users/userRouter")

// const server = express();

// server.get('/', (req, res) => {
//   res.send(`<h2>Let's write some middleware!</h2>`);
// });

// // Global Middleware
// server.use(express.json())
// server.use(logger)
// server.use('/api/users', userRouter)



// //custom middleware

// function logger(req, res, next) {
//   console.log(
//     `[${new Date().toISOString()}] ${req.method} to ${req.url}`
//   )

//   next()
// }

// module.exports = server;
