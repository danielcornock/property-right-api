const express = require('express');

const globalErrorHandler = require('./errors/errorController');
const userRouter = require('./users/userRoutes');

const app = express();

//* Body Parser *//
app.use(express.json());

//*---------------------------------------------
//* App main router
//*---------------------------------------------
app.use('/api/v1/users', userRouter);

//*---------------------------------------------
//* Handle unrecognised route requests
//*---------------------------------------------
app.all('*', (req, res, next) => {
  next(new Error(`Can't find ${req.originalUrl} on the server.`));
  // TODO - Install global AppError here.
});

app.use(globalErrorHandler);

module.exports = app;
