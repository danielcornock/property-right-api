const express = require('express');
const propertyController = require('./propertyController');
const propertyMiddleware = require('./propertyMiddleware');
const authController = require('../users/authController');

const router = express.Router();

router
  .route('/')
  .get(authController.authGuard, propertyController.getAllProperties)
  .post(
    authController.authGuard,
    propertyMiddleware.setPropertyUserId,
    propertyController.createNewProperty
  );

router
  .route('/:id')
  .delete(
    authController.authGuard,
    propertyMiddleware.checkDocumentIsOwn,
    propertyController.deleteProperty
  );

module.exports = router;
