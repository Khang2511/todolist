import React from 'react';
import '../css/listStyle/style.css'
import {useState} from 'react'
import { projectFirestore } from '../firebase/config';
import TodoEdit from './TodoEdit';
function TodoList({value}) {
  const [editTodo, setEditTodo] = useState('');
  const [edit, setEdit] = useState(false);

  function handleDone(id){
    projectFirestore.collection("todos").doc(id).update({
      Status: "Done",
    });
}
  function handleEdit(todo){
    setEdit(true)
    setEditTodo(todo)
  }

  function handleDel(id){
    if (window.confirm("Delete this image ?")) {
      projectFirestore.collection("todos").doc(id).delete();
    } 
  }

  return (
    <div className='todolist'>
        {
        value.map((todo)=>(
          
          <ul className='todolist__list' key={todo.id}>
            <li className= {(() => {
          switch (todo.Status) {
            case 'Not started':
              return "list not_started";
            case 'Pending':
              return "list pending" ;
            case 'Delayed':
              return "list delayed";
            case 'In progress':
              return "list inprogress";
            case 'Done':
              return "list done" ;
            default:
              return null;
          }
        })()}>
           <i className={
             todo.Status === "Done" ? 
             "fa fa-check-circle-o list__btn" 
             : "fa fa-circle list__btn" 
           } aria-hidden="true"
           onClick={()=>handleDone(todo.id)}
           ></i>
            <div className='list__item'>
                <div className='item'>
                  <div className='item__name'>
                    <p>{todo.Name}</p>
                    <i>{todo.Desc} </i> 
                </div>
                  <div className='item__status'>
                    <p className={(() => {
                    switch (todo.Status) {
                      case 'Not started':
                        return "not_started";
                      case 'Pending':
                        return "pending" ;
                      case 'In progress':
                        return "inprogress";
                      case 'Delayed':
                        return "delayed";  
                      case 'Done':
                        return "done" ;
                      default:
                        return null;
                    }
                  })()}>{todo.Status}</p>
                  </div>
                  <div className='item__priority'>
                    <p className={(() => {
                    switch (todo.Priority) {
                      case 'Low':
                        return "low";
                      case 'High':
                        return "high" ;
                      case 'Medium':
                        return "medium";
                      case 'Critical':
                        return "critical";  
                      default:
                        return null;
                    }
                  })()}>{todo.Priority}</p>
                  </div>
                  <div className='item__deadline'>
                    <p>{todo.Deadline}</p>
                  </div>
                  <div className='item__tool'>
                    <i className="fa fa-trash-o tool__del" aria-hidden="true" 
                    onClick={()=>handleDel(todo.id)}></i>
                    <i className="fa fa-edit  tool__edit" 
                    onClick={()=>handleEdit(todo)}
                    ></i>
                  </div>
                </div>
            </div>
          </li>
        </ul>
        ))}
     
        {edit? <TodoEdit setEdit={setEdit} editTodo={editTodo}/> : ''}
    </div>
  )
}

export default TodoList;
