const express = require('express');

const tenantController = require('./tenantController');
const authController = require('../users/authController');
const authMiddleware = require('../users/authMiddleware');

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
