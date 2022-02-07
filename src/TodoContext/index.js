import React from 'react';
import { useLocalStorage } from './useLocalStorage';

const TodoContext = React.createContext();

function TodoProvider(props) {
  const {
    item: localStorageTodos, 
    setLocalStorageItem: setLocalStorageTodos, 
    loading, 
    error
  } = useLocalStorage('TODOS_V1', []);
  
  const [openModal, setOpenModal] = React.useState(false);
  const [searchValue, setSearchValue] = React.useState('');

  const completedTodos = localStorageTodos.filter((todo) => !!todo.completed).length;
  const totalTodos = localStorageTodos.length;
  
  let searchedTodos = localStorageTodos.filter((todo) => {
    return todo.text.toLowerCase().includes(searchValue.toLowerCase());
  });

  const addTodo = (text) => {
    let newTodos = [...localStorageTodos];
    newTodos.push({
      completed: false,
      text,
    });
    setLocalStorageTodos(newTodos);
  }

  const completeTodo = (index) => {
    let newTodos = [...localStorageTodos];
    newTodos[index].completed = true;
    setLocalStorageTodos(newTodos);
  }

  const deleteTodo = (index) => {
    let newTodos = [...localStorageTodos];
    newTodos.splice(index, 1);
    setLocalStorageTodos(newTodos);
  }

  return (
    <TodoContext.Provider value={{
      error,
      loading,
      completedTodos,
      totalTodos,
      searchValue,
      setSearchValue,
      searchedTodos,
      addTodo,
      completeTodo,
      deleteTodo,
      openModal,
      setOpenModal,
    }}>
      {props.children}
    </TodoContext.Provider>
  );
}

export { TodoContext, TodoProvider };
