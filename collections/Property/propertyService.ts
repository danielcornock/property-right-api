class PropertyService {
  constructor() {}

  public combinePropertiesAndTodos(properties: Array<any>, todos: Array<any>) {
    if (!todos) return properties;

    const updatedProperties: Array<any> = properties;
    let tempProp;
    let tempArray: Array<any> = [];
    todos.forEach(todo => {
      properties.forEach((property, index) => {
        if (todo._id + '' == property._id + '') {
          updatedProperties[index]['todoCount'] = todo.count;
        }
      });
    });
    return updatedProperties;
  }
}

export default new PropertyService();
