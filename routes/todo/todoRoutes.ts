import { GuardedRoutes } from '../abstract/guardedRoutes';
import { TodoController } from '../../collections/Todo/todoController';

export class TodoRoutes extends GuardedRoutes {
  private controller: TodoController;
  constructor() {
    super();
    this.controller = new TodoController();
    this._assignRoutes();
  }

  protected _assignRoutes(): void {
    this.router.get('/', this.controller.getAllTodos);

    this.router.post('/', this.controller.createTodo);

    this.router.get('/:todoId', this.controller.getTodo);

    this.router.put('/:todoId', this.controller.updateTodo);

    this.router.delete('/:todoId', this.controller.deleteTodo);
  }
}

export default new TodoRoutes().routes;
