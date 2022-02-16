import React from 'react';
import '../css/listStyle/style.css'
import {useState} from 'react'
import { useEffect } from 'react';
import { projectFirestore } from '../firebase/config';
import TodoEdit from './TodoEdit';

import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import TodoDetail from './TodoDetail';


function TodoList2({value, setValue,sortBy,direction,show,filter,filterBy}) {
    const [editTodo, setEditTodo] = useState('');
    const [edit, setEdit] = useState(false);
    const [detail,setDetail] = useState(false);
    const [detailTodo, setDetailTodo] = useState('');

    const [preValue, setPreValue] = useState(value);


    useEffect(()=>{
      for(let i = 0; i<value.length;i++){
        projectFirestore.collection("todos").doc(value[i].id).update({
        index:preValue[i].index,
      });
    }
    show?
    (
      filter && filterBy!=="All" ?
      projectFirestore
          .collection("todos")
            .orderBy(sortBy,direction)
              .onSnapshot(function(querySnapshot){
          setValue(querySnapshot.docs.map((doc)=>(
            {
              index:doc.data().index,
              id: doc.id,
              Deadline: doc.data().Deadline,
              Name: doc.data().Name,
              Desc: doc.data().Desc,
              Priority: doc.data().Priority,
              Status: doc.data().Status,
            }
          )
          )
          .filter((task)=>
          task.Status!=="Done")
          .filter((task)=>
          task.Status===filterBy)
          )
        }
      )
      :
      projectFirestore
          .collection("todos")
            .orderBy(sortBy,direction)
              .onSnapshot(function(querySnapshot){
          setValue(querySnapshot.docs.map((doc)=>(
            {
              index:doc.data().index,
              id: doc.id,
              Deadline: doc.data().Deadline,
              Name: doc.data().Name,
              Desc: doc.data().Desc,
              Priority: doc.data().Priority,
              Status: doc.data().Status,
            }
          )).filter((task)=>
          task.Status!=="Done")
          )
        }
      )
    )
    :
    (
      filter && filterBy!=="All" ?
      projectFirestore
          .collection("todos")
            .orderBy(sortBy,direction)
              .onSnapshot(function(querySnapshot){
          setValue(querySnapshot.docs.map((doc)=>(
            {
              index:doc.data().index,
              id: doc.id,
              Deadline: doc.data().Deadline,
              Name: doc.data().Name,
              Desc: doc.data().Desc,
              Priority: doc.data().Priority,
              Status: doc.data().Status,
            }
          )).filter((task)=>
          task.Status===filterBy)
          )
        }
      )
      :
      (
        projectFirestore
            .collection("todos")
              .orderBy(sortBy,direction)
                .onSnapshot(function(querySnapshot){
            setValue(querySnapshot.docs.map((doc)=>(
              {
                index:doc.data().index,
                id: doc.id,
                Deadline: doc.data().Deadline,
                Name: doc.data().Name,
                Desc: doc.data().Desc,
                Priority: doc.data().Priority,
                Status: doc.data().Status,
              }
            ))) 
          }
        )
      )
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[preValue])

    

  function handleOnDragEnd(result) {
    if(sortBy === "index"){

      if (!result.destination) return;
        const items = Array.from(value);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);
        setPreValue(value)
        setValue(items);
    }
    else
        alert("Please unsort before drag an item");
      
    //   for(let i = 0; i<items.length;i++){
    //     console.log(items[i])
    //   console.log(value[i])
    //     projectFirestore.collection("todos").doc(items[i].id).update({
    //     index:value[i].index,
    //   });
    // }
    
    }
    
  function handleDone(id,status){
    if(status !== "Done"){
      projectFirestore.collection("todos").doc(id).update({
        Status: "Done",
      });
    }
    else
    {
      projectFirestore.collection("todos").doc(id).update({
        Status: "Not started",
      });
    }

}
  function handleEdit(todo){
    setEdit(true)
    setEditTodo(todo)
  }
  function handleDetail(todo){
    setDetail(true)
    setDetailTodo(todo)
  }

  function handleDel(id){
    if (window.confirm("Delete this task ?")) {
      projectFirestore.collection("todos").doc(id).delete();
    } 
  }
  console.log(value)
  return (
    <div className='todolist'>
        <DragDropContext onDragEnd={handleOnDragEnd}>
          <Droppable droppableId="characters">
            {(provided) => (
              <ul className="characters" {...provided.droppableProps} ref={provided.innerRef}>
                {value.map((todo, index) => {
                  return (
                    <Draggable key={todo.id} 
                    draggableId={todo.id} 
                    index={index}
                    >

                      {(provided) => (
                        <ul 
                        className='todolist__list' 
                        ref={provided.innerRef} 
                        {...provided.draggableProps} 
                        {...provided.dragHandleProps}>
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
                         onClick={()=>handleDone(todo.id,todo.Status)}
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
                                  <i className="fa fa-info-circle tool__detail" aria-hidden="true"
                                  onClick={()=>handleDetail(todo)}
                                  ></i>
                                </div>
                              </div>
                          </div>
                        </li>
                      </ul>
                      )}
                    </Draggable>
                  );
                })}
                {provided.placeholder}
              </ul>
            )}
          </Droppable>
        </DragDropContext>
        {edit? <TodoEdit setEdit={setEdit} editTodo={editTodo}/> : ''}
        {detail? <TodoDetail setDetail={setDetail} detailTodo={detailTodo}/> : ''}
    </div>
  );
}


export default TodoList2