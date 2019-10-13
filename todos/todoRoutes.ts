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

router.route('/todos-per-property').get(todoController.getTodosPerProperty);

router
  .route('/:id')
  .get(todoController.getTodo)
  .delete(todoController.deleteTodo)
  .put(todoController.updateTodo);

module.exports = router;
