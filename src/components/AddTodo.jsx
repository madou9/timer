import React, { useState } from 'react';
import { v4 as uuid } from 'uuid'; // Importing uuid function from uuid package

function AddTodo(props) {
    let Button; // Declare Button variable
    const [title, setTitle] = useState(props.title ? props.title : ""); // State for todo title
    const [project, setProject] = useState(props.project ? props.project : ""); // State for todo project

    // Determine button text based on submitText prop
    Button = props.submitText ? "Edit" : "Create";

    // Function to add new todo
    const addNewTodo = () => {
        const newArr = [
            ...props.todos,
            {
                id: uuid(), // Generate unique id for new todo
                title: title,
                project: project,
                edit: true // Set edit mode to true for new todo
            }
        ];

        props.setTodos(newArr); // Update todo list
        setTitle(""); // Clear title input
        setProject(""); // Clear project input
        props.setChoose(false); // Close AddTodo component
    }

    // Function to update existing todo
    const update = (id) => {
        const newArr = [...props.todos];
        newArr.forEach(item => {
            if (item.id === id) {
                item.title = title; // Update title
                item.project = project; // Update project
                item.edit = true; // Set edit mode to true
            }
        });
        props.setTodos(newArr); // Update todo list
    }

    // Final update function triggered when submitting an update
    const finalUpdate = () => {
        update(props.todo.id); // Update the specific todo
    }

    return (
        <div className='card col-3 mt-2 mx-auto text-center bg-primary'>
            <div className='card text-start'>
                <label>Titre</label>
                {/* Input field for todo title */}
                <input
                    className='form-control'
                    type="text"
                    placeholder="Add Title of your Project"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <label>Projet</label>
                {/* Input field for todo project */}
                <input
                    className='form-control'
                    type="text"
                    placeholder="Add Name of your Project"
                    value={project}
                    onChange={(e) => setProject(e.target.value)}
                />
                {/* Button for adding new todo or updating existing todo */}
                <button className='bg-primary' onClick={props.submitText ? finalUpdate : addNewTodo}>{Button}</button>
            </div>
        </div>
    );
}

export default AddTodo;
