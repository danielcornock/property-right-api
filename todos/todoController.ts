import Todo, { ITodoDocument } from './todoModel';
import {
  IRequest,
  IResponse,
  INext
} from '../utilities/interfaces/IMiddlewareParams';
const catchAsync = require('../errors/catchAsync');
const AppError = require('../errors/AppError');

export const createTodo = catchAsync(
  async (req: IRequest, res: IResponse, next: INext) => {
    const todo = await Todo.create(req.body);

    res.status(200).json({
      status: 'success',
      data: {
        todo
      }
    });
  }
);

export const getAllTodos = catchAsync(
  async (req: IRequest, res: IResponse, next: INext) => {
    let filter: Partial<ITodoDocument> = { user: req.user.id };
    if (req.params.propertyId) {
      filter.propertyId = req.params.propertyId;
    }

    const todos = await Todo.find(filter);
    res.status(200).json({
      status: 'success',
      data: {
        todos
      }
    });
  }
);

export const deleteTodo = catchAsync(
  async (req: IRequest, res: IResponse, next: INext) => {
    const todo = await Todo.findByIdAndDelete(req.params.id);

    res.status(204).json({
      status: 'success',
      data: null
    });
  }
);

export const updateTodo = catchAsync(
  async (req: IRequest, res: IResponse, next: INext) => {
    const todo = await Todo.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    if (!todo) {
      return next(new AppError('No todo found with that ID!', 404));
    }

    res.status(200).json({
      status: 'success',
      data: {
        todo
      }
    });
  }
);

export const getTodosPerProperty = catchAsync(
  async (req: IRequest, res: IResponse, next: INext) => {
    const propertyTodos = await Todo.aggregate([
      {
        $match: { propertyName: { $exists: true }, completed: { $ne: true } }
      },
      {
        $group: {
          _id: '$propertyId',
          count: { $sum: 1 }
        }
      }
    ]);

    res.status(200).json({
      status: 'success',
      data: {
        propertyTodos
      }
    });
  }
);
