import React from 'react';
import uuid from 'react-uuid';

import '../../styles/normalize.css';
import '../../styles/global.css';

export const App = () => {
  const [addTodo, setAddTodo] = React.useState('');
  const [todos, setTodos] = React.useState([]);
  const [completed, setCompleted] = React.useState(false);

  const handleChange = e => {
    setAddTodo(e.target.value);
  };

  const onSubmit = e => {
    e.preventDefault();
    const todo = addTodo;
    if (!todo) {
      return;
    }
    const newTodo = { id: uuid(), name: todo, completed: false };
    setTodos(prevTodos => [newTodo, ...prevTodos]);
    setAddTodo('');
  };

  const todosElement = todos.map(todo => {
    return (
      <li key={todo.id} className="item">
        <div className="itemGoup">
          <svg
            onClick={() => setCompleted(true)}
            className="completeIcon"
            stroke="currentColor"
            fill="currentColor"
            strokeWidth="0"
            viewBox="0 0 16 16"
            height="1rem"
            width="1rem"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M8 15A7 7 0 108 1a7 7 0 000 14zm0 1A8 8 0 108 0a8 8 0 000 16z"
              clipRule="evenodd"
            ></path>
          </svg>
          <span> {todo.name}</span>
        </div>
        <svg
          className="removeIcon"
          stroke="currentColor"
          fill="currentColor"
          strokeWidth="0"
          viewBox="0 0 16 16"
          height="1.5rem"
          width="1.5rem"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            d="M2.5 1a1 1 0 00-1 1v1a1 1 0 001 1H3v9a2 2 0 002 2h6a2 2 0 002-2V4h.5a1 1 0 001-1V2a1 1 0 00-1-1H10a1 1 0 00-1-1H7a1 1 0 00-1 1H2.5zm3 4a.5.5 0 01.5.5v7a.5.5 0 01-1 0v-7a.5.5 0 01.5-.5zM8 5a.5.5 0 01.5.5v7a.5.5 0 01-1 0v-7A.5.5 0 018 5zm3 .5a.5.5 0 00-1 0v7a.5.5 0 001 0v-7z"
            clipRule="evenodd"
          ></path>
        </svg>
      </li>
    );
  });

  const clearAllToDo = () => {
    setTodos(() => []);
  };

  return (
    <section className="container">
      <section className="card">
        <header className="header">
          <svg
            onClick={clearAllToDo}
            className="clearIcon"
            stroke="currentColor"
            fill="none"
            strokeWidth="3"
            viewBox="0 0 24 24"
            strokeLinecap="round"
            strokeLinejoin="round"
            height="1.5rem"
            width="1.5rem"
            xmlns="http://www.w3.org/2000/svg"
          >
            <polyline points="23 4 23 10 17 10"></polyline>
            <polyline points="1 20 1 14 7 14"></polyline>
            <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path>
          </svg>
          <div className="date"></div>
        </header>
        <main className="cardContent">
          <div className="search">
            <input className="inputSearch" type="text" placeholder="Search" />
          </div>
          <ul className="list">{todosElement}</ul>
        </main>
        <div className="card-footer">
          <form onSubmit={onSubmit} className="formAddTodo addToDo">
            <svg
              className="addTodoIcon"
              stroke="currentColor"
              fill="currentColor"
              strokeWidth="0"
              viewBox="0 0 1024 1024"
              height="3rem"
              width="3rem"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm192 472c0 4.4-3.6 8-8 8H544v152c0 4.4-3.6 8-8 8h-48c-4.4 0-8-3.6-8-8V544H328c-4.4 0-8-3.6-8-8v-48c0-4.4 3.6-8 8-8h152V328c0-4.4 3.6-8 8-8h48c4.4 0 8 3.6 8 8v152h152c4.4 0 8 3.6 8 8v48z"></path>
            </svg>
            <input
              name="addToDo"
              value={addTodo}
              onChange={handleChange}
              type="text"
              className="inputTodo"
              placeholder="Add a TODO"
            />
          </form>
        </div>
      </section>
    </section>
  );
};
