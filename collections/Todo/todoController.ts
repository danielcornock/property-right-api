import { INext, IRequest, IResponse } from '../../config/interfaces/IMiddlewareParams';
import databaseService from '../../services/database/databaseService';
import Todo, { ITodo } from './todoModel';
import responseService from '../../services/responseService';
import DatabaseService from '../../services/database/databaseService';
import todoService from './todoService';

export class TodoController {
  private _todoDataService: DatabaseService;

  constructor() {
    this._todoDataService = new DatabaseService(Todo);
  }

  public async getAllTodos(req: IRequest, res: IResponse, next: INext): Promise<void> {
    let query: any = {};
    if (req.params.propertyId) {
      query.propertyId = req.params.propertyId;
    }

    const todos = await this._todoDataService.findMany(req.user._id, query);

    responseService.successFind(res, { todos: todos });
  }

  public async createTodo(req: IRequest, res: IResponse, next: INext): Promise<void> {
    const todo = await this._todoDataService.create(req.user._id, req.body);
    responseService.successCreate(res, { todo: todo });
  }

  public async getTodo(req: IRequest, res: IResponse, next: INext): Promise<void> {
    const todo = await this._todoDataService.findOne(req.user._id, { _id: req.params.todoId });
    responseService.successFind(res, { todo: todo });
  }

  public async updateTodo(req: IRequest, res: IResponse, next: INext): Promise<void> {
    const oldTodo = await this._todoDataService.findOne(req.user._id, { _id: req.params.todoId });
    const updatedTodo = todoService.assignTodo(req.body, oldTodo);
    const todoRes = await updatedTodo.save();
    responseService.successCreate(res, { todo: todoRes });
  }

  public async deleteTodo(req: IRequest, res: IResponse, next: INext): Promise<void> {
    await this._todoDataService.deleteOne(req.user._id, { _id: req.params.todoId });
    responseService.successDelete(res);
  }
}
