const express = require('express');

const app = express();

//* Body Parser
app.use(express.json());

//* Handle unrecognised route requests
app.all('*', (req, res, next) => {
  next(new Error(`Can't find ${req.originalUrl} on the server.`));
  // TODO - Install global AppError here.
});

module.exports = app;
