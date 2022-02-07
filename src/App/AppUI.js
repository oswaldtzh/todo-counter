import React from 'react';
import { TodoCounter } from '../TodoCounter';
import { TodoSearch } from '../TodoSearch';
import { TodoList } from '../TodoList';
import { TodoItem } from '../TodoItem';
import { CreateTodoButton } from '../CreateTodoButton';
import { TodoContext } from '../TodoContext';
import { Modal } from '../Modal';
import { TodoForm } from '../TodoForm';
import { TodoListError } from '../TodoListError';
import { TodoListLoading } from '../TodoListLoading';
import { TodoListEmpty } from '../TodoListEmpty';

const AppUI = () => {
  const {
    error,
    loading,
    searchedTodos,
    completeTodo,
    deleteTodo,
    openModal,
    setOpenModal,
  } = React.useContext(TodoContext);

  return <React.Fragment>
    <TodoCounter />
    <TodoSearch />

    <TodoList>
      {error && <TodoListError error={error} />}
      {(loading && !error) && new Array(5).fill(1).map((a, i) => <TodoListLoading key={i} />)}
      {(!loading && !searchedTodos.length) && <TodoListEmpty />}

      {searchedTodos.map((todo, index) => (
        <TodoItem
          key={index}
          text={todo.text}
          completed={todo.completed}
          onComplete={() => completeTodo(index)}
          onDelete={() => deleteTodo(index)}
        />
      ))}
    </TodoList>

    {openModal && (
      <Modal>
        <TodoForm />
      </Modal>
    )}
    
    <CreateTodoButton setOpenModal={setOpenModal} />
  </React.Fragment>
};

export { AppUI };
