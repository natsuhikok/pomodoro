import React from 'react';
import { connect } from 'react-redux';

const Todo = ({ text }) => (
  <li>
    {text}
  </li>
);

const TodoList = ({ todos }) => (
  <ul>
    {todos.map(todo =>
      <Todo
        key={todo.id}
        {...todo}
      />,
    )}
  </ul>
);

const mapStateToProps = state => ({ todos: state.todos });
export default connect(mapStateToProps)(TodoList);
