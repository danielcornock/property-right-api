const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Mockgoose = require('mockgoose').Mockgoose;
const statusInfo = require('./utilities/statusInfo');
const mockgoose = new Mockgoose(mongoose);

dotenv.config({ path: './config.env' });
const environment = process.env.NODE_ENV;

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

exports.connect = () => {
  return new Promise((resolve, reject) => {
    if (process.env.NODE_ENV === 'test') {
      mockgoose.prepareStorage().then(() => {
        mongoose
          .connect(DB, {
            useNewUrlParser: true,
            useCreateIndex: true,
            useFindAndModify: false
          })
          .then((res, err) => {
            if (err) return reject(err);
            statusInfo.timeLog(`Connected to ${environment} database.`);
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
          statusInfo.timeLog(`Connected to ${environment} database.`);
          resolve();
        });
    }
  });
};

exports.close = () => {
  return mongoose.disconnect();
};
