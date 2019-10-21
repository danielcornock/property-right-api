const db = require('../db');

export const setupDatabase = done => {
  db.connect()
    .then(() => done())
    .catch(err => done(err));
};

export const closeDatabase = done => {
  db.close()
    .then(() => done())
    .catch(err => done(err));
};
