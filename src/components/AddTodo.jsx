import React, { useState } from 'react';
import { v4 as uuid } from 'uuid';

function AddTodo(props) {
    let buttonText; // Declare buttonText variable
    const [title, setTitle] = useState(props.title || ""); // State for todo title
    const [project, setProject] = useState(props.project || ""); // State for todo project

    // Determine button text based on submitText prop
    buttonText = props.submitText ? "Edit" : "Create";

    // Function to add new todo
    const addNewTodo = () => {
        const newTodo = {
            id: uuid(), // Generate unique id for new todo
            title: title,
            project: project,
            edit: true // Set edit mode to true for new todo
        };

        props.setTodos([...props.todos, newTodo]); // Update todo list
        setTitle(""); // Clear title input
        setProject(""); // Clear project input
        props.setChoose(false); // Close AddTodo component
    }

    // Function to update existing todo
    const updateTodo = (id) => {
        const updatedTodos = props.todos.map(todo => {
            if (todo.id === id) {
                return { ...todo, title: title, project: project, edit: true };
            }
            return todo;
        });

        props.setTodos(updatedTodos); // Update todo list
    }

    // Final update function triggered when submitting an update
    const handleFinalUpdate = () => {
        updateTodo(props.todo.id); // Update the specific todo
    }

    return (
        <div className='card col-3 mt-2 mx-auto text-center bg-primary'>
            <div className='card text-start'>
                <label>Title</label>
                {/* Input field for todo title */}
                <input
                    className='form-control'
                    type="text"
                    placeholder="Add Title of your Project"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <label>Project</label>
                {/* Input field for todo project */}
                <input
                    className='form-control'
                    type="text"
                    placeholder="Add Name of your Project"
                    value={project}
                    onChange={(e) => setProject(e.target.value)}
                />
                {/* Button for adding new todo or updating existing todo */}
                <button className='bg-primary' onClick={props.submitText ? handleFinalUpdate : addNewTodo}>{buttonText}</button>
            </div>
        </div>
    );
}

export default AddTodo;
