const expect = require('chai').expect;
const request = require('supertest');
const testing = require('../../utilities/testing');

process.env.NODE_ENV = 'test';
const apiUrl = '/api/v1/users';

const app = require('../app');
const newUser = {
  name: 'Test name',
  email: 'testemail@email.com',
  password: 'testpassword'
};

const createNewUser = () => {
  return new Promise((resolve, reject) => {
    request(app)
      .post(apiUrl + '/signup')
      .send(newUser)
      .then((res, err) => {
        if (err) return reject(err);
        resolve(res);
      });
  });
};
describe('Initialisation', () => {
  before(done => {
    testing.setupDatabase(done);
  });

  after(done => {
    testing.closeDatabase(done);
  });

  describe('when signing up', () => {
    describe('with the correct credentials', () => {
      const user = {
        name: 'Test name',
        email: 'testemail@email.com',
        password: 'testpassword'
      };

      it('should respond with the user details and a jwt token', done => {
        request(app)
          .post(apiUrl + '/signup')
          .send(user)
          .then(res => {
            const data = res.body.data.user;
            expect(res.statusCode).to.equal(201);
            expect(res.body).to.contain.property('token');
            expect(data).to.contain.property('_id');
            expect(data).to.contain.property('role');
            expect(data).to.not.contain.property('password');
            expect(data.name).to.equal(user.name);
            expect(data.email).to.equal(user.email);
            done();
          })
          .catch(err => done(err));
      });
    });
    describe('with missing credentials', () => {
      const user = {
        name: 'test man',
        password: 'password'
      };
      it('should reject an incomplete form', done => {
        request(app)
          .post('/api/v1/users/signup')
          .send(user)
          .then(res => {
            const body = res.body;
            expect(res.statusCode).to.equal(400);
            expect(body.message).to.equal('Invalid input data. You must enter an email address!');
            done();
          })
          .catch(err => {
            done(err);
          });
      });
    });

    describe('with an incorrect email address', () => {
      const user = {
        name: 'Test Man',
        email: 'testmangmail.com',
        password: 'password'
      };
      it('should send an error message stating the problem', done => {
        request(app)
          .post(apiUrl + '/signup')
          .send(user)
          .then(res => {
            const body = res.body;
            expect(res.statusCode).to.equal(400);
            expect(body.message).to.equal(
              "Invalid input data. Hmm, it seems like that email address isn't valid!"
            );
            done();
          })
          .catch(err => {
            done(err);
          });
      });
    });
  });

  describe('when creating a new user account', () => {
    const loginDetails = {
      email: newUser.email,
      password: newUser.password
    };
    it('should be able to be logged in to', () => {
      createNewUser().then(res => {
        request(app)
          .post(apiUrl + '/login')
          .send(loginDetails)
          .then(res => {
            expect(res.body).to.contain.property('token');
            expect(res.statusCode).to.equal(201);
            done();
          });
      });
    });
  });
});
