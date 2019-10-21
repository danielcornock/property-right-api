import Tenant, { ITenantDocument, ITenant } from './tenantModel';
import { catchAsync } from '../errors/catchAsync';
import AppError from '../errors/AppError';
import Property from '../properties/propertyModel';
import { IRequest, IResponse, INext } from '../../utilities/interfaces/IMiddlewareParams';
import * as databaseService from '../../services/databaseService';
import * as authService from '../users/authMiddleware';

export const getAllTenants = catchAsync(async (req: IRequest, res: IResponse, next: INext) => {
  let filter: Partial<ITenant> = { user: req.user._id };
  if (req.params.propertyId) {
    filter.propertyId = req.params.propertyId;
  }

  const tenants = await Tenant.find(filter).sort({ name: 1 });
  res.status(200).json({
    status: 'success',
    data: {
      tenants
    }
  });
});

export const getTenant = catchAsync(async (req: IRequest, res: IResponse, next: INext) => {
  const tenant = await Tenant.findById(req.params.id);

  res.status(200).json({
    status: 'success',
    data: {
      tenant
    }
  });
});

export const createTenant = catchAsync(async (req: IRequest, res: IResponse, next: INext) => {
  req.body.user = authService.setBodyUserId(req);
  const tenant = await databaseService.create(Tenant, req.body);

  if (req.body.propertyId) {
    await databaseService.findByIdAndUpdate(Property, req.body.propertyId, {
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

export const deleteTenant = catchAsync(async (req: IRequest, res: IResponse, next: INext) => {
  const tenant = await databaseService.findByIdAndDelete(Tenant, req.params.id);

  if (tenant.propertyId) {
    await databaseService.findByIdAndUpdate(Property, tenant.propertyId, {
      $pull: { tenants: req.params.id }
    });
  }

  res.status(204).json({
    status: 'success',
    data: null
  });
});

export const updateTenant = catchAsync(async (req: IRequest, res: IResponse, next: INext) => {
  const tenant = await databaseService.findByIdAndUpdate(Tenant, req.params.id, req.body);

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
