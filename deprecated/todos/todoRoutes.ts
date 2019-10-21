import express from 'express';

import * as todoController from './todoController';
import * as authController from '../users/authController';

const router = express.Router({ mergeParams: true });

router.use(authController.authGuard);
router
  .route('/')
  .get(todoController.getAllTodos)
  .post(todoController.createTodo);

router.route('/todos-per-property').get(todoController.getTodosPerProperty);

router
  .route('/:id')
  .get(todoController.getTodo)
  .delete(todoController.deleteTodo)
  .put(todoController.updateTodo);

export default router;
