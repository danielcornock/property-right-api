const mongoose = require('mongoose');
const dotenv = require('dotenv');

const app = require('./app');

dotenv.config({ path: './config.env' });

//*---------------------------------------------
//* Handle all uncaught exceptions
//*---------------------------------------------
process.on('uncaughtException', err => {
  console.log('Uncaught Rejection: App shutting down.');
  console.log(err.name, err.message);
  process.exit(1);
});

//*---------------------------------------------
//* Connect to database
//*---------------------------------------------
let DB;
if (process.env.NODE_ENV === 'test') {
  DB = process.env.DATABASE_TEST;
} else {
  DB = process.env.DATABASE;
}
const DB = DB.replace('<PASSWORD>', process.env.DATABASE_PASSWORD);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
  })
  .then(() => {
    console.log(`[${new Date().toLocaleTimeString()}] Connected to database.`);
  });

//*---------------------------------------------
//* Start server
//*---------------------------------------------
const port = process.env.port || 2000;
app.listen(port, () => {
  console.log(
    `[${new Date().toLocaleTimeString(
      'it-IT'
    )}] Server started on port ${port} in ${process.env.NODE_ENV} mode.`
  );
});
