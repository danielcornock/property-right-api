import { INext, IRequest, IResponse } from '../../config/interfaces/IMiddlewareParams';
import Todo, { ITodo } from './todoModel';
import responseService from '../../services/responseService';
import DatabaseService from '../../services/database/databaseService';
import queryService from '../../services/queryService';

export class TodoController {
  private _todoDataService: DatabaseService<ITodo>;

  constructor() {
    this._todoDataService = new DatabaseService(Todo);
  }

  public async getAllTodos(req: IRequest, res: IResponse, next: INext): Promise<void> {
    try {
      const query = queryService.buildParamQuery(req.params);

      const todos = await this._todoDataService
        .findMany(req.user._id, query)
        .populate({ path: 'property', select: 'name' });

      responseService.successFind(res, { todos: todos });
    } catch {
      return next(new Error('Unable to fetch todos.'));
    }
  }

  public async createTodo(req: IRequest, res: IResponse, next: INext): Promise<void> {
    try {
      const todo = await this._todoDataService.create(req.user._id, req.body);
      responseService.successCreate(res, { todo: todo });
    } catch {
      return next(new Error('Error creating todo.'));
    }
  }

  public async getTodo(req: IRequest, res: IResponse, next: INext): Promise<void> {
    try {
      const todo = await this._todoDataService
        .findOne(req.user._id, { _id: req.params.todoId })
        .populate({ path: 'property', select: 'name' });

      responseService.successFind(res, { todo: todo });
    } catch {
      return next(new Error('Unable to fetch todo'));
    }
  }

  public async updateTodo(req: IRequest, res: IResponse, next: INext): Promise<void> {
    try {
      const [updatedTodo] = await this._todoDataService.update(
        req.user._id,
        { _id: req.params.todoId },
        req.body
      );
      responseService.successCreate(res, { todo: updatedTodo });
    } catch {
      return next(new Error('Unable to update todo'));
    }
  }

  public async deleteTodo(req: IRequest, res: IResponse, next: INext): Promise<void> {
    try {
      await this._todoDataService.deleteOne(req.user._id, { _id: req.params.todoId });
      responseService.successDelete(res);
    } catch {
      return next(new Error('Unable to delete todo.'));
    }
  }
}
