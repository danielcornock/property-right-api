const mongoose = require('mongoose');
const Mockgoose = require('mockgoose').Mockgoose;
const statusInfo = require('./utilities/statusInfo');
const mockgoose = new Mockgoose(mongoose);
const config = require('./utilities/config');

const DB = config.database(config.env);

exports.connect = () => {
  return new Promise((resolve, reject) => {
    if (config.env === 'test') {
      mockgoose.prepareStorage().then(() => {
        mongoose
          .connect(DB, {
            useNewUrlParser: true,
            useCreateIndex: true,
            useFindAndModify: false
          })
          .then((res, err) => {
            if (err) return reject(err);
            statusInfo.timeLog(`Connected to ${config.env} database.`);
            resolve();
          });
      });
    } else {
      mongoose
        .connect(DB, {
          useNewUrlParser: true,
          useCreateIndex: true,
          useFindAndModify: false
        })
        .then((res, err) => {
          if (err) return reject(err);
          statusInfo.timeLog(`Connected to ${config.env} database.`);
          resolve();
        });
    }
  });
};

exports.close = () => {
  return mongoose.disconnect();
};
