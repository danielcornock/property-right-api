const Property = require('./propertyModel');
const Todo = require('./../todos/todoModel');
const catchAsync = require('../errors/catchAsync');
const AppError = require('../errors/AppError');

exports.getAllProperties = catchAsync(async (req, res, next) => {
  const properties = await Property.find({ user: req.user.id });

  res.status(200).json({
    status: 'success',
    data: {
      properties
    }
  });
});

exports.createNewProperty = catchAsync(async (req, res, next) => {
  const property = await Property.create(req.body);

  res.status(201).json({
    status: 'success',
    data: {
      property
    }
  });
});

exports.deleteProperty = catchAsync(async (req, res, next) => {
  await Property.findByIdAndDelete(req.params.id);
  await Todo.deleteMany({ propertyId: req.params.id });

  res.status(204).json({
    status: 'success',
    data: null
  });
});

exports.getProperty = catchAsync(async (req, res, next) => {
  const property = await Property.findById(req.params.id);

  res.status(200).json({
    status: 'success',
    data: {
      property
    }
  });
});
