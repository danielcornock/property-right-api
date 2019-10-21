import { IRequest, IResponse } from '../../config/interfaces/IMiddlewareParams';
import databaseService from '../../services/database/databaseService';
import Todo from './todoModel';
import responseService from '../../services/responseService';
import DatabaseService from '../../services/database/databaseService';

export class TodoController {
  private _todoDataService: DatabaseService;
  constructor() {
    this._todoDataService = new DatabaseService(Todo);
  }

  public async getAllTodos(req: IRequest, res: IResponse): Promise<void> {
    const todos = this._todoDataService.findMany(req.user._id);
    responseService.successFind(res, { todos: todos });
  }

  public async createTodo(req: IRequest, res: IResponse): Promise<void> {
    const todo = this._todoDataService.create(req.user._id, req.body);
    responseService.successCreate(res, { todo: todo });
  }

  public async getTodo(req: IRequest, res: IResponse): Promise<void> {
    const todo = this._todoDataService.findOne(req.user._id, { _id: req.params.todoId });
    responseService.successFind(res, { todo: todo });
  }

  public async updateTodo(req: IRequest, res: IResponse): Promise<void> {
    const todo = this._todoDataService.update(req.user._id, req.params.todoId, req.body);
    responseService.successCreate(res, { todo: todo });
  }

  public async deleteTodo(req: IRequest, res: IResponse): Promise<void> {
    this._todoDataService.delete(req.user._id, { _id: req.params.todoId });
    responseService.successDelete(res);
  }

  public async getTodosPerProperty(req: IRequest, res: IResponse) {
    const propertyTodos = await this._todoDataService.aggregate([
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

    responseService.successFind(res, { propertyTodos: propertyTodos });
  }
}
