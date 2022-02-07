import React from 'react';
import {useState} from "react";
import { connect} from "react-redux";
import {addTodos,removeTodos} from "../redux/reducer";

const  mapStateToProps = (state) => {
    return {
         todos: state,
    }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addTodo: (obj) => dispatch(addTodos(obj)),
    removeTodo: (id) => dispatch(removeTodos(id)),
  };
};

const Todos = (props) => {

    const [todo,setTodo] = useState("")

    const add = () => {
    if (todo === "") {
      alert("Input is Empty");
    } else {
      props.addTodo({
        id: Math.floor(Math.random() * 1000),
        item: todo,
        completed: false,
      });
      setTodo("");
    }
  };
    
    const handleChange = (event) => {
      setTodo(event.target.value)
    }
    console.log(todo)

    return (
        <div className='addTodos'>
            <input type='text' className='todo-input' onChange={handleChange}/>
            <button className='add-btn' onClick={() => add()}>Add</button>

            <br />

              <ul>
                {props.todos.length > 0 &&
                  props.todos.map((item) => {
                    return <li key={item.id}>{item.item}
                        <button onClick={() => props.removeTodo(item.id)}>Delete</button>
                    </li>;
                  })}
              </ul>
        </div>
    )
}

export default connect(mapStateToProps,mapDispatchToProps)(Todos);