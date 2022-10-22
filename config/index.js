/* eslint no-console: 0 */
const mongoose = require('mongoose');

const connectionString = 'mongodb://localhost/TLMQuiz';

mongoose.connect(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

mongoose.connection
  .on('connected', () => {
    const mc = mongoose.connection;
    console.log(`Mongoose connection made at ${mc.host}:${mc.port}`);
    console.log('Successful connection to Database!');
  })
  .on('error', (err) => {
    console.error(`MongoDB error: ${err.message.brightRed}`);
    process.exit(1);
  })
  .on('disconnected', () => {
    console.log('Mongoose disconnected, Please try again.'.brightRed);
  });
