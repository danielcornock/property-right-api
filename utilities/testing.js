const db = require('../db');

exports.setupDatabase = done => {
  db.connect()
    .then(() => done())
    .catch(err => done(err));
};

exports.closeDatabase = done => {
  db.close()
    .then(() => done())
    .catch(err => done(err));
};
