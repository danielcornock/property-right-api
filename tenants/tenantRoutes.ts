import express from 'express';

import * as tenantController from './tenantController';
import authController from '../users/authController';
import authMiddleware from '../users/authMiddleware';

const router = express.Router({ mergeParams: true });

router.use(authController.authGuard);
router
  .route('/')
  .get(tenantController.getAllTenants)
  .post(authMiddleware.setBodyUserId, tenantController.createTenant);

router
  .route('/:id')
  .get(tenantController.getTenant)
  .delete(tenantController.deleteTenant)
  .put(tenantController.updateTenant);

module.exports = router;
