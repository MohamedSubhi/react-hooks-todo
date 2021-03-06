import React, {useReducer} from 'react';
import Form from './Form';
import './App.css';
import {produce} from 'immer';
const todosReducer = (todos, action) => {
  switch(action.type){
    case 'ADD_TODO':
      return produce(todos,(draftState)=>{
        draftState.unshift({text: action.text, complete: false})
      });
    case 'TOGGLE_COMPLETE':
      return produce(todos, (draftState)=>{
        draftState[action.i].complete = !draftState[action.i].complete;
      });
    case 'RESET':
        return [];
    default:
        return todos;
  }
};

export default () => {
  const [todos, dispatch] = useReducer(todosReducer, []);
  
  return(
    <div className="App" style={{textAlign: "center"}}>
      <Form dispatch={dispatch}/>
      <div>
        {
          todos.map(({text, complete}, i) => (
            <div key={text} onClick={() => dispatch({ type: 'TOGGLE_COMPLETE', i})}
              style={{ textDecoration: complete ? 'line-through' : ''}}
            >
              {text}
            </div>
          ))
        }
      </div>
      <button onClick={() => dispatch({type: 'RESET'})}>reset</button>
    </div>
  );
}