import React from 'react';
// import TodoList from './TodoList';
import TodoList2 from './TodoList2';
import {useState, useEffect} from 'react'
import { projectFirestore } from '../firebase/config';


function TodoAll({show,sortBy,setSortBy,direction,filterBy,filter,setTodos,todos}) {
    const[value, setValue]=useState([]);
    useEffect(()=>{
        let todos = getTodos();
        return ()=> todos;
      },[show,sortBy,direction,filterBy])

      function getTodos(){
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
          task.Status!="Done")
          .filter((task)=>
          task.Status==filterBy)
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
          task.Status!="Done")
          )
        }
      )
    )
    :
    (
      filter && filterBy!="All" ?
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
          task.Status==filterBy)
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
    projectFirestore
            .collection("todos")
              .orderBy(sortBy,direction)
                .onSnapshot(function(querySnapshot){
            setTodos(querySnapshot.docs.map((doc)=>(
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
  }
        
      
  return (
      <TodoList2  
      value={value} 
      setValue={setValue} 
      todos={todos} 
      setTodos={setTodos}
      sortBy={sortBy}
      setSortBy={setSortBy}
      />
  )
}

export default TodoAll;
