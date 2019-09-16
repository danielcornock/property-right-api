const catchAsync = require('../errors/catchAsync');
const AppError = require('../errors/AppError');
const Property = require('./propertyModel');

exports.checkDocumentIsOwn = catchAsync(async (req, res, next) => {
  const documentToAmend = await Property.findById(req.params.id);

  if (!documentToAmend) {
    return next(new AppError('This document does not exist!', 404));
  }

  //* Converts userID 'object' to a string
  const documentUser = documentToAmend.user + '';
  if (documentUser !== req.user.id) {
    return next(
      new AppError('You are not authorised to alter this document', 401)
    );
  }

  next();
});
