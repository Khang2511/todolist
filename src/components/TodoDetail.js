import React from 'react';
import '../css/detailStyle/style.css'

function TodoDetail({setDetail,detailTodo}) {
    function handleCancel(){
        setDetail(false)
}

  return (
    <div className='tododetail'>
        <div className="tododetail__form">
              <form action="/" className='infor'>
                  <i onClick={handleCancel} className="fa fa-window-close infor__close" aria-hidden="true"></i>
                  <h1>Edit todo</h1>
                  <div className="infor__name">
                      <label htmlFor='name'>Name<span>*</span></label>
                      <input id="name" type="text" name="name" required 
                        value={detailTodo.Name}
                        readOnly
                        />
                  </div>
                  <div className="infor__desc">
                      <label htmlFor="desciption">Description</label>
                      <textarea id="instructions" rows="3"
                       value={detailTodo.Desc}
                       readOnly
                       ></textarea>
                  </div>
                  <div className="infor__status-priority">
                      <div className="status">
                          <p>Status</p>
                          <input id="name" type="text" name="name" required 
                        value={detailTodo.Status}
                        readOnly
                        />
                      </div>
                      <div className="priority">
                          <p>Priority</p>
                          <input id="name" type="text" name="name" required 
                        value={detailTodo.Priority}
                        readOnly
                        />
                      </div>
                  </div>
                  <div className="infor__deadline">
                      <label htmlFor="deadline">Deadline</label>
                      <input className="deadline" 
                      type="datetime-local" 
                      name="deadline" 
                      value={detailTodo.Deadline}
                      readOnly
                        />
                      <i className="fas fa-calendar-alt"></i>
                  </div>
                  
                  <div className="infor__btn">
                      <button onClick={handleCancel} href="/">Cancel</button>
                  </div>
              </form>
          </div>
  </div>
)
}

export default TodoDetail;
