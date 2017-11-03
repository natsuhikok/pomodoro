let nextTodoId = 0;
export const addTodo = (text) => {
  nextTodoId += 1;
  return {
    type: 'ADD_TODO',
    id: nextTodoId,
    text,
  };
};
