import mongoose = require('mongoose');
import { Mockgoose } from 'mockgoose';
import timeLog from './utilities/statusInfo';
import * as config from './utilities/config';

const mockgoose = new Mockgoose(mongoose);
const DB = config.database(config.env);

export const connect = () => {
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
            timeLog(`Connected to ${config.env} database.`);
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
          timeLog(`Connected to ${config.env} database.`);
          resolve();
        });
    }
  });
};

export const close = () => {
  return mongoose.disconnect();
};
