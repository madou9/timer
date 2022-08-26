import React, { useState } from 'react'
import  { v4 } from 'uuid';
import AddTodo from './AddTodo';

import Timer from './Timer';

function DisplayForm() {
  const [submitText, setSubmitText] =useState(false)
  const[choose, setChoose] = useState(false)
  const [todos, setTodos] = useState([
    {
    id: v4(),
     title:'title',
     project:'project',
     edit:true

  },
])

const deleteTodo = (id) =>{
  const newArr = [...todos].filter(item =>item.id !==id)
  setTodos(newArr)
}

const updateTodo =(id) =>{
  const updatedItem = [...todos];
  updatedItem.forEach(item =>{
    if(item.id === id){
      item.edit= false
    }
  });
  setTodos(updatedItem);
  setSubmitText(true)
  
}

  return (
    <div>
      {
        todos.map((param) =>(
     
          <div key={param.id}>
             {param.edit? (
             <div className='card col-3 mx-auto bg-dark'>
              <div className='card-body'>
               <div className='row text-light'>
               <label className='text-start'>{param.title}</label>
                <label className='text-start'>{param.project}</label>
                <Timer deleteTodo={() => deleteTodo(param.id)} updateTodo ={() => updateTodo(param.id)}  />
               </div>
                
              </div>
            </div>) :(<AddTodo submitText= {submitText} setSubmitText={setSubmitText} todo={param} title={param.title} project={param.project}  setTodos={setTodos}  todos={todos} />)}
          </div>
        ))
      }
      {
        choose ?(<AddTodo  setChoose={setChoose} setTodos={setTodos} todos={todos} choose={choose} />):(<p className='btn' onClick={() =>setChoose(!choose)}>+</p>)
      }
    </div> 
  )
}

export default DisplayForm