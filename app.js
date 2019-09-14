const express = require('express');
const cors = require('cors');

const globalErrorHandler = require('./errors/errorController');
const userRouter = require('./users/userRoutes');
const propertyRouter = require('./properties/propertyRoutes');

const app = express();

//* Body Parser *//
app.use(express.json());
//* CORS allow localhost
app.use(
  cors({
    origin: 'http://localhost:4200'
  })
);

//*---------------------------------------------
//* App main router
//*---------------------------------------------
app.use('/api/v1/users', userRouter);
app.use('/api/v1/properties', propertyRouter);
//*---------------------------------------------
//* Handle unrecognised route requests
//*---------------------------------------------
app.all('*', (req, res, next) => {
  next(new Error(`Can't find ${req.originalUrl} on the server.`));
  // TODO - Install global AppError here.
});

app.use(globalErrorHandler);

module.exports = app;
