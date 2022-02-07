import React, { useState } from 'react';
import { TodoContext } from '../TodoContext';
import './TodoForm.css'

function TodoForm() {
  const { addTodo, setOpenModal } = React.useContext(TodoContext);
  const [text, setText] = React.useState('');

  const onChange = (event) => {
    setText(event.target.value);
  }

  const onCancel = () => {
    setOpenModal(false);
  }

  const onSubmit = (event) => {
    event.preventDefault();

    if (text.length > 10) {
      addTodo(text);
      setOpenModal(false);
    } else {
      console.log('la longitud debe ser mayor a 10');
    }
  }

  return (
    <>
      <form onSubmit={onSubmit}>
        <label>Escribe el contenido</label>
        <textarea onChange={onChange} value={text} placeholder='Escribe el contenido' />
        <div className="TodoForm-buttonContainer">
          <button className="TodoForm-button TodoForm-button-cancel" type="button" onClick={onCancel}>Cancelar</button>
          <button className="TodoForm-button TodoForm-button-add" type="submit">Añadir</button>
        </div>
      </form>
    </>
  );
}

export { TodoForm };
