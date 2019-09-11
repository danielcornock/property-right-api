const dotenv = require('dotenv');

const app = require('./app');
const db = require('./db');
const statusInfo = require('./utilities/statusInfo');

dotenv.config({ path: './config.env' });

//*---------------------------------------------
//* Handle all uncaught exceptions
//*---------------------------------------------
process.on('uncaughtException', err => {
  console.log(err.name, err.message);
  statusInfo.timeLog('Uncaught rejection! App shutting down.');
  process.exit(1);
});

const port = process.env.PORT || 2000;
const environment = process.env.NODE_ENV;

//*---------------------------------------------
//* Start server
//*---------------------------------------------
db.connect().then(() => {
  app.listen(port, () => {
    statusInfo.timeLog(
      `Server started on port ${port} in ${environment} mode.`
    );
  });
});
