import { Model } from 'mongoose';

const catchAsync = require('../errors/catchAsync');
const AppError = require('../errors/AppError');

export const checkRequestIsAuthorised = (
  docUserId: object,
  reqUserId: string
) => {
  return String(docUserId) === reqUserId;
};
