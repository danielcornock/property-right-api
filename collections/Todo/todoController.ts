import { IRequest, IResponse } from '../../config/interfaces/IMiddlewareParams';
import databaseService from '../../services/database/databaseService';
import Todo from './todoModel';
import responseService from '../../services/responseService';
import DatabaseService from '../../services/database/databaseService';

const _todoDataService: DatabaseService = new DatabaseService(Todo);

export class TodoController {
  constructor() {}

  public async getAllTodos(req: IRequest, res: IResponse): Promise<void> {
    let query: any = {};
    if (req.params.propertyId) {
      query.propertyId = req.params.propertyId;
    }

    const todos = await _todoDataService.findMany(req.user._id, query);

    responseService.successFind(res, { todos: todos });
  }

  public async createTodo(req: IRequest, res: IResponse): Promise<void> {
    const todo = await _todoDataService.create(req.user._id, req.body);
    responseService.successCreate(res, { todo: todo });
  }

  public async getTodo(req: IRequest, res: IResponse): Promise<void> {
    const todo = await _todoDataService.findOne(req.user._id, { _id: req.params.todoId });
    responseService.successFind(res, { todo: todo });
  }

  public async updateTodo(req: IRequest, res: IResponse): Promise<void> {
    const oldTodo: any = await _todoDataService.findOne(req.user._id, { _id: req.params.todoId });
    if (req.body.completed !== undefined && req.body.completed !== oldTodo.completed) {
      oldTodo.completed = req.body.completed;
    } else {
      oldTodo.title = req.body.title;
      oldTodo.date = req.body.date;
      oldTodo.severity = req.body.severity;
      oldTodo.propertyId = req.body.propertyId;
    }
    const updatedTodo = await oldTodo.save();
    responseService.successCreate(res, { todo: updatedTodo });
  }

  public async deleteTodo(req: IRequest, res: IResponse): Promise<void> {
    await _todoDataService.delete(req.user._id, { _id: req.params.todoId });
    responseService.successDelete(res);
  }

  public async getTodosPerProperty(req: IRequest, res: IResponse) {
    const propertyTodos = await _todoDataService.aggregate([
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
