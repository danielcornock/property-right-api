const express = require('express');
const cors = require('cors');

const AppError = require('./errors/AppError');
const globalErrorHandler = require('./errors/errorController');
const userRouter = require('./users/userRoutes');
const propertyRouter = require('./properties/propertyRoutes');
const todoRouter = require('./todos/todoRoutes');

const app = express();

//* Body Parser *//
app.use(express.json());
//* CORS allow localhost
app.use(
  cors({
    origin: 'http://localhost:4200'
  })
);

app.use((req, res, next) => {
  console.log('API request made.');
  next();
});

//*---------------------------------------------
//* App main router
//*---------------------------------------------
app.use('/api/v1/users', userRouter);
app.use('/api/v1/properties', propertyRouter);
app.use('/api/v1/todos', todoRouter);
//*---------------------------------------------
//* Handle unrecognised route requests
//*---------------------------------------------
app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on the server.`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
