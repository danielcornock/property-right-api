const expect = require('chai').expect;
const request = require('supertest');
const testing = require('../utilities/testing');

process.env.NODE_ENV = 'test';
const apiUrl = '/api/v1/users';

const app = require('../app');

describe('Creating a new user', () => {
  before(done => {
    testing.setupDatabase(done);
  });

  after(done => {
    testing.closeDatabase(done);
  });

  describe('with the correct credentials', () => {
    const user = {
      name: 'Test name',
      email: 'testemail@email.com',
      password: 'testpassword'
    };

    it('should create a new user', done => {
      request(app)
        .post(apiUrl + '/signup')
        .send(user)
        .then(res => {
          const data = res.body.data.data;

          expect(res.statusCode).to.equal(200);
          expect(data).to.contain.property('_id');
          expect(data.password).to.not.contain.property('password');
          expect(data.name).to.equal(user.name);
          expect(data.email).to.equal(user.email);
          done();
        })
        .catch(err => done(err));
    });
  });
  describe('with the incorrect credentials', () => {
    const user = {
      name: 'Daniel Cornock',
      password: 'password'
    };
    it('should reject an incomplete form', done => {
      request(app)
        .post('/api/v1/users/signup')
        .send(user)
        .then(res => {
          const body = res.body;
          expect(res.statusCode).to.equal(400);
          expect(body.message).to.equal(
            'Invalid input data. You must enter an email address!'
          );
          done();
        })
        .catch(err => {
          done(err);
        });
    });
  });
});
