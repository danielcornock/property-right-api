import Property from './propertyModel';
import Todo from '../todos/todoModel';
import { catchAsync } from '../errors/catchAsync';
import AppError from '../errors/AppError';
import * as fileService from '../../services/fileService';
import * as databaseService from '../../services/databaseService';
import * as authService from '../users/authMiddleware';
import * as authorise from '../validation/authorise';
import { IRequest, IResponse, INext } from '../../utilities/interfaces/IMiddlewareParams';

export const getAllProperties = catchAsync(async (req: IRequest, res: IResponse, next: INext) => {
  const properties = await databaseService.findAllByUser(Property, req.user._id);

  res.status(200).json({
    status: 'success',
    data: {
      properties
    }
  });
});

export const createNewProperty = catchAsync(async (req: IRequest, res: IResponse, next: INext) => {
  req.body.user = authService.setBodyUserId(req);
  req.body.image = await fileService.setImagePath(req);
  const property = await databaseService.create(Property, req.body);

  res.status(201).json({
    status: 'success',
    data: {
      property
    }
  });
});

export const deleteProperty = catchAsync(async (req: IRequest, res: IResponse, next: INext) => {
  await databaseService.deleteOne(Property, {
    _id: req.params.id,
    user: req.user._id
  });
  await databaseService.deleteMany(Todo, {
    propertyId: req.params.id,
    user: req.user._id
  });

  res.status(204).json({
    status: 'success',
    data: null
  });
});

export const getProperty = catchAsync(async (req: IRequest, res: IResponse, next: INext) => {
  const property = await databaseService.findById(Property, req.params.id);

  if (!property) {
    return next(new AppError('Cannot find property.', 404));
  } else if (!authorise.checkRequestIsAuthorised(property.user, req.user._id)) {
    return next(new AppError('You are not authorised to view this document.', 401));
  }

  res.status(200).json({
    status: 'success',
    data: {
      property
    }
  });
});

export const editProperty = catchAsync(async (req: IRequest, res: IResponse, next: INext) => {
  if (req.file) {
    req.body.image = await fileService.setImagePath(req);
  }

  const property = await databaseService.findByIdAndUpdate(Property, req.params.id, req.body);

  if (!property) {
    return next(new AppError('No property found with that ID!', 404));
  }
  res.status(200).json({
    status: 'success',
    data: {
      property
    }
  });
});
