/* eslint no-unused-vars: 0, no-console: 0 */
const port = process.env.PORT || 5050;
const http = require("http")
const express = require('express');
// Mongo Connection
require('./config');

const app = express();
const authRoutes = require('./server/routes/auth');
const imgRoutes = require('./server/routes/images');
const web_devRoutes = require('./server/routes/web_dev_quiz');
const mern_routes = require('./server/routes/mern_quiz');
const colors = require('./server/util/terminalColors');

// This is replacing body parser
app.use(express.json());

// http://localhost:3030/api will show you if your server is working correctly
app.get('/', (req, res) => {
  res.send({ Server: 'You\'re Server is running!' });
});

const server = http.createServer(app).listen(port)

server.on("error", onError)
server.on("listening", onListening)

function onError(error) {
  if (error.syscall !== "listen") throw error

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case "EACCES":
      console.error(`Port ${error.port} requires elevated privileges`.brightMagenta)
      process.exit(1)
      break
    case "EADDRINUSE":
      console.error(`Port ${error.port} is already in use`.brightMagenta)
      process.exit(1)
      break
    default:
      throw error
  }
}

// Prepend to server routes
app.use('/auth', authRoutes);
app.use('/img', imgRoutes);
app.use('/web_dev', web_devRoutes);
app.use('/mern', mern_routes);

function onListening() {
  const addr = server.address()
  console.log(`Server running on port ${addr.port}! Press Ctrl + C to stop`);
  console.log(`Enviorment: ${app.get('env')}`.trap.brightGreen.bold.bgBlack);
}

