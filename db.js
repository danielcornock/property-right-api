const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Mockgoose = require('mockgoose').Mockgoose;
const mockgoose = new Mockgoose(mongoose);

dotenv.config({ path: './config.env' });

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
            console.log(
              `[${new Date().toLocaleTimeString()}] Connected to database.`
            );
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
          console.log(
            `[${new Date().toLocaleTimeString()}] Connected to database.`
          );
          resolve();
        });
    }
  });
};

exports.close = () => {
  return mongoose.disconnect();
};
