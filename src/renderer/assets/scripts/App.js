import React from 'react';
import TodoList from './components/TodoList';
import AddTodo from './components/AddTodo';

const App = () => (
  <div>
    <AddTodo />
    <TodoList />
  </div>
);

export default App;
