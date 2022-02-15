import React, { useState } from 'react';
import '../css/headerStyle/style.css'
import TodoAdd from './TodoAdd';
import TodoAll from './TodoAll';
function TodoHeader() {
    const [add,setAdd] = useState(false);
    const [show,setShow] = useState(true);
    const [sortBy,setSortBy] = useState("index");
    const [direction,setDirection] = useState("desc")
    const [filterBy, setFilterBy] = useState("")
    const [filter, setFilter] = useState(false)
    const [todos,setTodos] = useState([])
    function handleAdd(){
        setAdd(true);
    }

    function handleShow(){
      setShow(!show)
    }
    function handleFilter(status){
        if(status!=="All"){
            
            setFilter(true)
        }
        else
        
            setFilter(false)
            setFilterBy(status)
      }

    function handleSort(tag,direc){
        
        if(direc !== "none"){
            setDirection(direc)
            setSortBy(tag)
        }
        else{
            setDirection("desc")
            setSortBy("index")
        }
    }



  return (
    <div className='todoheader'>
      <h1>Todo-List</h1>
        <ul className='todoheader__function'>
            <li className='function__show'>
                <input 
                    type='checkbox' 
                    onChange={handleShow}
                    checked={show? true : false}
                />
                <label>Show incomplete task only</label>
                
            </li>
            <li className='function__add'>
                <button onClick={handleAdd}>+ Add task</button>
            </li>
            {add? <TodoAdd setAdd={setAdd} todos={todos} /> : ''}
        </ul>
        <ul className='todolist__tag'>
          <li className='tag__name header__tag'>
              
            <p>
                Name 
            </p>
                <select 
                defaultValue={'none'}
                onChange={(e)=>handleSort("Name",e.target.value)}
                >
                <option value='none'>Not selected</option>
                <option value='asc'>Ascending &#xf160;</option>
                <option value='desc'>Descending &#xf161;</option>
                </select>
          </li>
          <li className='tag__status header__tag'>
                <p>Status 
                </p>
                    <select 
                    defaultValue={'All'} onChange={(e) => {
                    handleFilter(e.target.value)}}
                    >
                        <option value="DEFAULT" disabled ></option>
                        <option value="All" >All</option>
                        <option value="Not started" >Not started</option>
                        <option value="Pending">Pending</option>
                        <option value="In progress">In progress</option>
                        <option value="Delayed">Delayed</option>
                        <option value="Done">Done</option>
                    </select>
          </li>
          <li className='tag__priority header__tag'>
              <p>Priority 
               </p>
                <select 
                    defaultValue={'none'}
                    onChange={(e)=>handleSort("Level",e.target.value)}
                    >
                    <option value="DEFAULT" disabled ></option>
                    <option value='none'>Not selected</option>
                    <option value='asc'>Ascending &#xf160;</option>
                    <option value='desc'>Descending &#xf161;</option>
                </select>
          </li>
          <li className='tag__deadline header__tag'>
                <p>Deadline 
                </p>
                    <select 
                        defaultValue={'none'}
                        onChange={(e)=>handleSort("Deadline",e.target.value)}
                        >
                        <option value='none'>Not selected</option>
                        <option value='asc'>Ascending &#xf160;</option>
                        <option value='desc'>Descending &#xf161;</option>
                    </select>
          </li>
        </ul>
        <TodoAll 
            show={show}  
            sortBy={sortBy} 
            setSortBy={setSortBy} 
            direction={direction} 
            filterBy={filterBy} 
            filter={filter}
            setTodos={setTodos}
            todos={todos}
            />
    </div>
    )
}

export default TodoHeader;
