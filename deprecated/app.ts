import express from 'express';
import cors from 'cors';
import path from 'path';
import morgan from 'morgan';

import AppError from './errors/AppError';
import globalErrorHandler from './errors/errorController';
import statusInfo from './utilities/statusInfo';

import userRouter from './users/userRoutes';
import propertyRouter from './properties/propertyRoutes';
import todoRouter from './todos/todoRoutes';
import tenantRouter from './tenants/tenantRoutes';

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

export default app;
