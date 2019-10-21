import express from 'express';

import * as tenantController from './tenantController';
import * as authController from '../users/authController';
import * as authMiddleware from '../users/authMiddleware';

const router = express.Router({ mergeParams: true });

router.use(authController.authGuard);
router
  .route('/')
  .get(tenantController.getAllTenants)
  .post(tenantController.createTenant);

router
  .route('/:id')
  .get(tenantController.getTenant)
  .delete(tenantController.deleteTenant)
  .put(tenantController.updateTenant);

export default router;
