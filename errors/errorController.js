const AppError = require('./AppError');
const config = require('../utilities/config');

//*---------------------------------------------
//* AVOID UNCAUGHT EXCEPTION ERRORS
//*---------------------------------------------

//* Handle casting errors
const handleCastErrorDB = err => {
  const message = `Invalid ${err.path}: ${err.value}.`;
  return new AppError(message, 400);
};

//* Handle duplicate field errors
const handleDuplicateFieldsDB = err => {
  const value = err.errmsg.match(/(["'])(\\?.)*?\1/)[0];
  const message = `This user already exists!`;
  return new AppError(message, 400);
};

//* Handle database validation error
const handleValidationErrorDB = err => {
  const errors = Object.values(err.errors).map(el => el.message);
  const message = `Invalid input data. ${errors.join('. ')}`;
  return new AppError(message, 400);
};

//* Handle incorrect JWT
const handleJWTError = () => new AppError('Please log in to continue.', 401);

//* Handle expired JWT
const handleJWTExpiredError = () =>
  new AppError('Your session has expired. Please log in again.', 401);

//*---------------------------------------------
//* ERROR HANDLERS
//*---------------------------------------------
const sendErrorDev = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack
  });
};

const sendErrorProd = (err, res) => {
  if (err.isOperational) {
    //* Operational error: Error that has been made by incorrect user actions
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message
    });
  } else {
    //* Non-operational error: Error that has been made by the program or faulty code
    console.error('ERROR!', err);
    res.status(500).json({
      status: 'error',
      message: 'Something went wrong!'
    });
  }
};

//*---------------------------------------------
//* ERROR HANDLING MIDDLEWARE
//*---------------------------------------------
module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  if (config.env === 'development') {
    sendErrorDev(err, res);
  } else if (config.env === 'production' || config.env === 'test') {
    //* By default, mongo errors are non-operational.
    //* However, we want the user to see error messages from mongoDB
    //* These handlers will make the errors operational

    let error = { ...err };
    if (error.code === 11000) error = handleDuplicateFieldsDB(error);

    switch (error.name) {
      case 'CastError':
        error = handleCastErrorDB(error);
        break;
      case 'ValidationError':
        error = handleValidationErrorDB(error);
        break;
      case 'JsonWebTokenError':
        error = handleJWTError();
        break;
      case 'TokenExpiredError':
        error = handleJWTExpiredError();
        break;
      default:
    }
    sendErrorProd(error, res);
  }
};
