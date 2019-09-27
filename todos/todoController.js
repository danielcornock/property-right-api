const Todo = require('./todoModel');
const catchAsync = require('../errors/catchAsync');
const AppError = require('../errors/AppError');

exports.createTodo = catchAsync(async (req, res, next) => {
  const todo = await Todo.create(req.body);

  res.status(200).json({
    status: 'success',
    data: {
      todo
    }
  });
});

exports.getAllTodos = catchAsync(async (req, res, next) => {
  let filter = { user: req.user.id };
  if (req.params.propertyId) {
    filter.propertyId = req.params.propertyId;
    console.log(filter);
  }

  const todos = await Todo.find(filter);
  res.status(200).json({
    status: 'success',
    data: {
      todos
    }
  });
});

exports.deleteTodo = catchAsync(async (req, res, next) => {
  const todo = await Todo.findByIdAndDelete(req.params.id);

  res.status(204).json({
    status: 'success',
    data: null
  });
});

exports.updateTodo = catchAsync((async (req, res, next) => {
  const todo = await Todo.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  if (!todo) {
    return next (new AppError('No todo found with that ID!', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      todo
    }
  })
}))
