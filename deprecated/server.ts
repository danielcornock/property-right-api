import app from './app';
import * as db from './db';
import timeLog from './utilities/statusInfo';
import * as config from '../z-API-v2/config/config';
//*---------------------------------------------
//* Handle all uncaught exceptions
//*---------------------------------------------
process.on('uncaughtException', err => {
  console.log(err.name, err.message);
  timeLog('Uncaught rejection! App shutting down.');
  process.exit(1);
});

//*---------------------------------------------
//* Start server
//*---------------------------------------------
db.connect().then(() => {
  app.listen(config.port, () => {
    timeLog(`Server started on port ${config.port} in ${config.env} mode.`);
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
