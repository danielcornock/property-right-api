import express from 'express';

import * as authController from './authController';

const router = express.Router();

router.post('/signup', authController.signup);
router.post('/login', authController.login);

export default router;
