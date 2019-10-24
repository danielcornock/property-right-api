class TodoService {
  constructor() {}

  public assignTodo(todo: any, oldTodo: any) {
    if (todo.completed !== undefined && todo.completed !== oldTodo.completed) {
      oldTodo.completed = todo.completed;
    } else {
      oldTodo.title = todo.title;
      oldTodo.date = todo.date;
      oldTodo.severity = todo.severity;
      oldTodo.propertyId = todo.propertyId;
    }

    return oldTodo;
  }
}

export default new TodoService();
