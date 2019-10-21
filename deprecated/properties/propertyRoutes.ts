import express from 'express';
import * as propertyController from './propertyController';
import * as authorise from '../validation/authorise';
import * as authController from '../users/authController';
import * as authMiddleware from '../users/authMiddleware';

import todoRouter from '../todos/todoRoutes';
import tenantRouter from '../tenants/tenantRoutes';
import imageUpload from '../../utilities/imageUpload';
const router = express.Router();

router.use(authController.authGuard);

router.use('/:propertyId/todos', todoRouter);
router.use('/:propertyId/tenants', tenantRouter);

router
  .route('/')
  .get(propertyController.getAllProperties)
  .post(imageUpload.single('image'), propertyController.createNewProperty);

router
  .route('/:id')
  .delete(propertyController.deleteProperty)
  .get(propertyController.getProperty)
  .put(imageUpload.single('image'), propertyController.editProperty);

export default router;
