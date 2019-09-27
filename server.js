const app = require('./app');
const db = require('./db');
const statusInfo = require('./utilities/statusInfo');
const config = require('./utilities/config');
//*---------------------------------------------
//* Handle all uncaught exceptions
//*---------------------------------------------
process.on('uncaughtException', err => {
  console.log(err.name, err.message);
  statusInfo.timeLog('Uncaught rejection! App shutting down.');
  process.exit(1);
});

//*---------------------------------------------
//* Start server
//*---------------------------------------------
db.connect().then(() => {
  app.listen(config.port, () => {
    statusInfo.timeLog(
      `Server started on port ${config.port} in ${config.env} mode.`
    );
  });
});

//*---------------------------------------------
//* Handle all unhandled rejections
//*---------------------------------------------
process.on('unhandledRejection', err => {
  console.log('UNHANDLED REJECTION! SHUTTING DOWN');
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});
