import React, { useState } from 'react'
import  { v4 } from 'uuid';


function AddTodo(props){
    let Button  
    const [title, setTitle] = useState(props.title?props.title:"")
    const [project, setProject] = useState(props.project?props.project:"")
     Button = props.submitText? "Modifier" : "Créér";

    const addNewTodo = () => {
        const newArr= [...props.todos,{
            id: v4(),
            title:title,
            project:project,
            edit:true
        }];

        props.setTodos(newArr)
       setTitle("")
       setProject("")
       props.setChoose(false)

      }

    const update = (id) => {
        const newArr= [...props.todos];
        newArr.forEach(item =>{
            if(item.id === id ){
                item.title = title;
                item.project = project;
                item.edit  = true;
            }
        })
        props.setTodos(newArr);
      }

      const FinalUpdate = () =>{
        update(props.todo.id)
      }
      
  return (
    <div className='card col-3 mt-2 mx-auto text-center bg-primary'>
        <div className='card text-start'>
        <label>Titre</label>
                <input
                className='form-control'
                type="text"
                placeholder="Mon projet"
                value={title}
                onChange = { (e) => setTitle(e.target.value)} 
                />
                 <label>Projet</label>
                <input
                className='form-control'
                type="text"
                placeholder="Mon projet"
                value={project}
                onChange = { (e) => setProject(e.target.value)} 
                />
                <button className='bg-primary' onClick={props.submitText?FinalUpdate:addNewTodo}>{Button}</button>
        </div>

    </div>
  )
}

export default AddTodo