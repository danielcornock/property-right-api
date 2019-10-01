const express = require('express');
const propertyController = require('./propertyController');
const propertyMiddleware = require('./propertyMiddleware');
const authController = require('../users/authController');
const authMiddleware = require('../users/authMiddleware');

const todoRouter = require('../todos/todoRoutes');
const tenantRouter = require('../tenants/tenantRoutes');
const imageUpload = require('../utilities/imageUpload');
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
  .delete(
    // propertyMiddleware.checkDocumentIsOwn,
    propertyController.deleteProperty
  )
  .get(propertyController.getProperty)
  .put(imageUpload.single('image'), propertyController.editProperty);

module.exports = router;
