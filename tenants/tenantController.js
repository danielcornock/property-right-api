const Tenant = require('./tenantModel');
const catchAsync = require('../errors/catchAsync');
const AppError = require('../errors/AppError');
const Property = require('../properties/propertyModel');

exports.getAllTenants = catchAsync(async (req, res, next) => {
  let filter = { user: req.user.id };
  if (req.params.propertyId) {
    filter.propertyId = req.params.propertyId;
  }

  const tenants = await Tenant.find(filter);
  res.status(200).json({
    status: 'success',
    data: {
      tenants
    }
  });
});

exports.getTenant = catchAsync(async (req, res, next) => {
  const tenant = await Tenant.findById(req.params.id);

  res.status(200).json({
    status: 'success',
    data: {
      tenant
    }
  });
});

exports.createTenant = catchAsync(async (req, res, next) => {
  const tenant = await Tenant.create(req.body);

  if (req.body.propertyId) {
    await Property.findByIdAndUpdate(req.body.propertyId, {
      $push: { tenants: tenant._id }
    });
  }
  res.status(200).json({
    status: 'success',
    data: {
      tenant
    }
  });
});

exports.deleteTenant = catchAsync(async (req, res, next) => {
  const tenant = await Tenant.findByIdAndDelete(req.params.id);

  if (tenant.propertyId) {
    await Property.findByIdAndUpdate(tenant.propertyId, {
      $pull: { tenants: req.params.id }
    });
  }

  res.status(204).json({
    status: 'success',
    data: null
  });
});

exports.updateTenant = catchAsync(async (req, res, next) => {
  const tenant = await Tenant.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  if (!tenant) {
    return next(new AppError('No tenant found with that ID!', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      tenant
    }
  });
});
