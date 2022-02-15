import React from 'react';
import '../css/editStyle/style.css'
import {useState} from 'react'
import { projectFirestore} from '../firebase/config.js';

function TodoEdit({setEdit,editTodo}) {
    const [editName,setEditName] = useState(editTodo.Name);
    const [editDeadline,setEditDeadline] = useState(editTodo.Deadline);
    const [editPriority,setEditPriority] = useState(editTodo.Priority);
    const [editStatus,setEditStatus] = useState(editTodo.Status);
    const [editDesc,setEditDesc] = useState(editTodo.Desc);
    function handleCancel(){
        setEdit(false)
    }

    function handleEdit(e){
        e.preventDefault();
        projectFirestore.collection("todos").doc(editTodo.id).update({
            Deadline: editDeadline,
            Name: editName,
            Desc: editDesc,
            Priority: editPriority,
            Status: editStatus,
        }
        );
        setEdit(false)
    }
  return (
    <div className='todoedit'>
        <div className="todoedit__form">
              <form action="/" className='infor'>
                  <i onClick={handleCancel} className="fa fa-window-close infor__close" aria-hidden="true"></i>
                  <h1>Edit todo</h1>
                  <div className="infor__name">
                      <label htmlFor='name'>Name<span>*</span></label>
                      <input id="name" type="text" name="name" required 
                            defaultValue={editTodo.Name} onChange={(e) => {
                          setEditName(e.target.value)
                          }}/>
                  </div>
                  <div className="infor__desc">
                      <label htmlFor="desciption">Description</label>
                      <textarea id="instructions" rows="3"
                       defaultValue={editTodo.Desc}
                       onChange={(e) => {
                        setEditDesc(e.target.value)
                        }}></textarea>
                  </div>
                  <div className="infor__status-priority">
                      <div className="status">
                          <p>Status</p>
                          <select 
                          defaultValue={editTodo.Status}
                          onChange={(e) => {
                            setEditStatus(e.target.value)
                            }}
                            >
                              <option value="DEFAULT" disabled></option>
                              <option value="Not started">Not started</option>
                              <option value="Pending">Pending</option>
                              <option value="In progress">In progress</option>
                              <option value="Delayed">Delayed</option>
                              <option value="Done">Done</option>
                          </select>
                      </div>
                      <div className="priority">
                          <p>Priority</p>
                          <select 
                          defaultValue={editTodo.Priority}
                          onChange={(e) => {
                            setEditPriority(e.target.value)
                            }}
                            >
                              <option value="DEFAULT" disabled></option>
                              <option value="Low">Low</option>
                                <option value="Medium">Medium</option>
                                <option value="High">High</option>
                                <option value="Critical">Critical</option>
                          </select>
                      </div>
                  </div>
                  <div className="infor__deadline">
                      <label htmlFor="deadline">Deadline</label>
                      <input className="deadline" 
                      type="datetime-local" 
                      name="deadline" 
                      defaultValue={editTodo.Deadline}
                      onChange={(e) => {
                        setEditDeadline(e.target.value)
                        }}
                        />
                      <i className="fas fa-calendar-alt"></i>
                  </div>
                  
                  <div className="infor__btn">
                      <button  onClick={handleEdit}>Edit</button>
                      <button onClick={handleCancel} href="/">Cancel</button>
                  </div>
              </form>
          </div>
  </div>
)
}

export default TodoEdit;
