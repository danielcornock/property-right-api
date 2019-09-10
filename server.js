const dotenv = require('dotenv');

const app = require('./app');
const db = require('./db');

dotenv.config({ path: './config.env' });

//*---------------------------------------------
//* Handle all uncaught exceptions
//*---------------------------------------------
process.on('uncaughtException', err => {
  console.log('Uncaught Rejection: App shutting down.');
  console.log(err.name, err.message);
  process.exit(1);
});

const port = process.env.PORT || 2000;

//*---------------------------------------------
//* Start server
//*---------------------------------------------

db.connect().then(() => {
  app.listen(port, () => {
    console.log(
      `[${new Date().toLocaleTimeString(
        'it-IT'
      )}] Server started on port ${port} in ${process.env.NODE_ENV} mode.`
    );
  });
});
