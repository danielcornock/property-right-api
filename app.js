const express = require('express');
const cors = require('cors');
const path = require('path');
const morgan = require('morgan');

const AppError = require('./errors/AppError');
const globalErrorHandler = require('./errors/errorController');
const statusInfo = require('./utilities/statusInfo');

const userRouter = require('./users/userRoutes');
const propertyRouter = require('./properties/propertyRoutes');
const todoRouter = require('./todos/todoRoutes');
const tenantRouter = require('./tenants/tenantRoutes');

const app = express();

//* Body Parser *//
app.use(express.json());
//* CORS allow localhost
app.use(
  cors({
    origin: 'http://localhost:4200'
  })
);

if (process.env.NODE_ENV !== 'production') {
  app.use(morgan('dev'));
}

app.use('/images', express.static(path.join(__dirname, '../images')));

//*---------------------------------------------
//* App main router
//*---------------------------------------------
app.use('/api/v1/users', userRouter);
app.use('/api/v1/properties', propertyRouter);
app.use('/api/v1/todos', todoRouter);
app.use('/api/v1/tenants', tenantRouter);
//*---------------------------------------------
//* Handle unrecognised route requests
//*---------------------------------------------
app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on the server.`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
