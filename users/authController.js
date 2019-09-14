const jwt = require('jsonwebtoken');
const { promisify } = require('util');

const User = require('./userModel');
const catchAsync = require('../errors/catchAsync');
const AppError = require('../errors/AppError');
const userMethods = require('./userMethods');

//*---------------------------------------------
//* SIGN UP NEW USER
//*---------------------------------------------
exports.signup = catchAsync(async (req, res, next) => {
  const user = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password
  });

  userMethods.createSendToken(user, 201, res);
});

//*---------------------------------------------
//* LOG IN TO EXISTING ACCOUNT
//*---------------------------------------------
exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new AppError('Please provide an email address and password.'));
  }

  const user = await User.findOne({ email }).select('+password');

  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError('Incorrect email or password', 401));
  }
  userMethods.createSendToken(user, 201, res);
});

//*---------------------------------------------
//* CONFIRM USER IS LOGGED IN
//*---------------------------------------------
exports.authGuard = catchAsync(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return next(
      new AppError('You are not logged in. Please log in to continue.', 401)
    );
  }

  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  const currentUser = await User.findById(decoded.id);
  console.log(currentUser);

  if (!currentUser) {
    return next(new AppError('This user no longer exists!', 401));
  }
  //TODO: Add checks that user hasn't changed their password recently

  req.user = currentUser;
  next();
});
