import React, { useState } from 'react';
import { v4 as uuid } from 'uuid'; // Importing uuid function from uuid package
import AddTodo from './AddTodo'; // Importing AddTodo component
import Timer from './Timer'; // Importing Timer component

function DisplayForm() {
  // State variables for managing form state
  const [submitText, setSubmitText] = useState(false); // State to track if text is submitted
  const [choose, setChoose] = useState(false); // State to track if user chooses to add new todo
  const [todos, setTodos] = useState([ // State to manage todo list
    {
      id: uuid(), // Generate unique id for todo item
      title: 'title',
      project: 'project',
      edit: true // Initial edit state set to true
    },
  ]);

  // Function to delete a todo item
  const deleteTodo = (id) => {
    const newArr = todos.filter(todo => todo.id !== id); // Filter out todo with given id
    setTodos(newArr); // Update todo list
  }

  // Function to update edit state of a todo item
  const updateTodo = (id) => {
    const updatedTodos = todos.map(todo => ({ // Map over todos array
      ...todo, // Keep existing todo properties
      edit: todo.id === id ? false : todo.edit // Update edit property if id matches
    }));
    setTodos(updatedTodos); // Update todo list
    setSubmitText(true); // Set submitText state to true
  }

  return (
    <div>
      {todos.map((todo) => (
        <div key={todo.id}>
          {todo.edit ? (
            // Display todo item with edit mode
            <div className='card col-3 mx-auto bg-dark'>
              <div className='card-body'>
                <div className='row text-light'>
                  <label className='text-start'>{todo.title}</label>
                  <label className='text-start'>{todo.project}</label>
                  {/* Pass deleteTodo and updateTodo functions to Timer component */}
                  <Timer deleteTodo={() => deleteTodo(todo.id)} updateTodo={() => updateTodo(todo.id)} />
                </div>
              </div>
            </div>
          ) : (
            // Display AddTodo component for editing todo item
            <AddTodo
              key={todo.id} // Use todo id as key for AddTodo component
              submitText={submitText}
              setSubmitText={setSubmitText}
              todo={todo}
              setTodos={setTodos}
              todos={todos}
            />
          )}
        </div>
      ))}
      {/* Conditional rendering for adding new todo */}
      {choose ? (
        // Display AddTodo component if choose state is true
        <AddTodo
          setChoose={setChoose}
          setTodos={setTodos}
          todos={todos}
          choose={choose}
        />
      ) : (
        // Display '+' button if choose state is false
        <p className='btn' onClick={() => setChoose(!choose)}>+</p>
      )}
    </div>
  );
}

export default DisplayForm;
