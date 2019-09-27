const express = require('express');

const todoController = require('./todoController');
const authController = require('../users/authController');
const authMiddleware = require('../users/authMiddleware');

const router = express.Router({ mergeParams: true });

router.use(authController.authGuard);
router
  .route('/')
  .get(todoController.getAllTodos)
  .post(authMiddleware.setBodyUserId, todoController.createTodo);

// TODO - this is messy - sort it out
router.route('/:id').delete(todoController.deleteTodo).put(todoController.updateTodo);
module.exports = router;
