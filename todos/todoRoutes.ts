import express from 'express';

import * as todoController from './todoController';
import authController from '../users/authController';
import authMiddleware from '../users/authMiddleware';

const router = express.Router({ mergeParams: true });

router.use(authController.authGuard);
router
  .route('/')
  .get(todoController.getAllTodos)
  .post(authMiddleware.setBodyUserId, todoController.createTodo);

router
  .route('/:id')
  .delete(todoController.deleteTodo)
  .put(todoController.updateTodo);

router.route('/todos-per-property').get(todoController.getTodosPerProperty);
module.exports = router;
