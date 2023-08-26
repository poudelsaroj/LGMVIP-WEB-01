import React, { useState } from 'react';
import './App.css'

function App(props) {
  const [tasks, setTasks] = useState([
    { id: 0, text: 'Sleep', completed: true, editing: false },
    { id: 1, text: 'Eat', completed: false, editing: false },
    { id: 2, text: 'Code', completed: false, editing: false },
    { id: 3, text: 'Repeat', completed: false, editing: false },
  ]);

  let nextTaskId = tasks.length;

  const addTask = (text) => {
    if (text.trim() !== "") {
      const newTask = { id: nextTaskId, text, completed: false, editing: false };
      setTasks([...tasks, newTask]);
      nextTaskId++; // Increment nextTaskId here
    }
  };

  const deleteTask = (taskId) => {
    setTasks(tasks.filter(task => task.id !== taskId));
    nextTaskId--; // Decrement nextTaskId to reflect the removed task
  };

  const toggleCompleted = (taskId) => {
    const updatedTasks = tasks.map(task =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  };

  const toggleEdit = (taskId) => {
    const updatedTasks = tasks.map(task =>
      task.id === taskId ? { ...task, editing: !task.editing } : task
    );
    setTasks(updatedTasks);
  };

  const saveEdit = (taskId, newText) => {
    const updatedTasks = tasks.map(task =>
      task.id === taskId ? { ...task, text: newText, editing: false } : task
    );
    setTasks(updatedTasks);
  };

  return (
<div className="main">
<h1>Todo-List</h1>
    <div className="todoapp stack-large">
      
      <form>
        <h2 className="label-wrapper">
          <label htmlFor="new-todo-input" className="label__lg">
            What needs to be done?
          </label>
        </h2>
        <input
          type="text"
          id="new-todo-input"
          className="input input__lg"
          name="text"
          autoComplete="off"
        />
        <button
          type="button"
          className="btn btn__primary btn__lg"
          onClick={() => {
            const input = document.getElementById("new-todo-input");
            addTask(input.value);
            input.value = "";
          }}
        >
          Add
        </button>
      </form>
      <div className="filters btn-group stack-exception">
        
      </div>
      <h2 id="list-heading">{tasks.filter(task => !task.completed).length} tasks remaining</h2>
      <ul
        role="list"
        className="todo-list stack-large stack-exception"
        aria-labelledby="list-heading">
        {tasks.map(task => (
          <li key={task.id} className={`todo stack-small ${task.completed ? 'completed' : ''}`}>
            <div className="c-cb">
              <input
                id={`todo-${task.id}`}
                type="checkbox"
                checked={task.completed}
                onChange={() => toggleCompleted(task.id)}
              />
              {!task.editing ? (
                <label className="todo-label" htmlFor={`todo-${task.id}`}>
                  {task.text}
                </label>
              ) : (
                <input
                  type="text"
                  className="input"
                  value={task.text}
                  onChange={(e) => {
                    const newText = e.target.value;
                    saveEdit(task.id, newText);
                  }}
                />
              )}
            </div>
            <div className="btn-group">
              <button
                type="button"
                className="btn"
                onClick={() => toggleEdit(task.id)}
              >
                {task.editing ? 'Save' : 'Edit'}
              </button>
              <button
                type="button"
                className="btn btn__danger"
                onClick={() => deleteTask(task.id)}
              >
                Delete <span className="visually-hidden">{task.text}</span>
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
    </div>
  );
}

export default App;
