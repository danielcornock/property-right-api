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
    this.router.get('/',(...args) => this.controller.getAllTodos(...args));

    this.router.post('/', (...args) =>this.controller.createTodo(...args));

    this.router.get('/:todoId',(...args) => this.controller.getTodo(...args));

    this.router.put('/:todoId',(...args) => this.controller.updateTodo(...args));

    this.router.delete('/:todoId',(...args) => this.controller.deleteTodo(...args));
  }
}

export default new TodoRoutes().routes;
