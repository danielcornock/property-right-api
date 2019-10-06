import express from 'express';
import * as propertyController from './propertyController';
import * as authorise from '../validation/authorise';
import authController from '../users/authController';
import authMiddleware from '../users/authMiddleware';

import todoRouter from '../todos/todoRoutes';
import tenantRouter from '../tenants/tenantRoutes';
import imageUpload from '../utilities/imageUpload';
const router = express.Router();

router.use(authController.authGuard);

router.use('/:propertyId/todos', todoRouter);
router.use('/:propertyId/tenants', tenantRouter);

router
  .route('/')
  .get(propertyController.getAllProperties)
  .post(
    imageUpload.single('image'),
    authMiddleware.setBodyUserId,
    propertyController.createNewProperty
  );

router
  .route('/:id')
  .delete(propertyController.deleteProperty)
  .get(propertyController.getProperty)
  .put(imageUpload.single('image'), propertyController.editProperty);

module.exports = router;
