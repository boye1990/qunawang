import React, { useState, useRef, useCallback, useEffect } from 'react';
import { creatSet, creatAdd, creatRemove, creatToggle } from './Action.js';
import './App.css';

let idSeq = Date.now();

let LS_KEY = '$_todoList_'

/**
 *@param actionCreators 需要派发的对象
 *@param dispatch 派发方法
 */
function bindActionCreators(actionCreators, dispatch) {
  const ret = {}
  for (let key in actionCreators) {
    ret[key] = function (...args) {
      const actionCreator = actionCreators[key];
      const action = actionCreator(...args);
      dispatch(action)
    };
  }
  return ret
}

// 输入待办事件的输入框组件
function Control(props) {
  // 通过解构 获取父组件传递的addtodo方法
  const { addTodo } = props;
  const inputRef = useRef()

  const onSubmit = (e) => { 
    e.preventDefault();
    // trim()函数去除字符串前后空格
    const newText = inputRef.current.value.trim();

    if (newText.length === 0) {
      return
    }
    
    addTodo({
      id: ++idSeq,
      complete: false,
      text: newText
    })
    // 清空input的值
    inputRef.current.value = '';
  }

  return (
    <div className='control'>
      <h1>todos</h1>
      <form onSubmit={onSubmit}>
        <input
          ref={inputRef}
          type="text"
          className='new-todo'
          placeholder= 'what needs to be done?'
        />
      </form>
    </div>
  )
}

// 单项待办事件组件
function TodoItem(props) {
  const { removeTodo, toggleTodo, todo: {id, text, complete} } = props;

  const onChange = () => {
    toggleTodo(id)
  }

  const onRemove = () => {
    removeTodo(id)
  }

  return (
    <li className='todo-item'>
      <input
        type="checkbox"
        onChange={ onChange }
        checked={ complete }
      />
      <label className={ complete ? 'complete' : ''}>{text}</label>
      <button onClick={ onRemove }>&#xd7;</button>
    </li>
  )
}

// 展示待办事件列表组件
function Todos(props) {
  const { toggleTodo, removeTodo, todos } = props
  return (
    <ul className='todos'>
        {
          todos.map(todo => {
            return (<TodoItem
                      key={todo.id}
                      toggleTodo={toggleTodo}
                      removeTodo={removeTodo}
                      todo={todo}
                   />)
          })
        }
    </ul>
  )
}

function TodoList() {
  // 待办事件列表
  const [todos, setTodos] = useState([]);

  // 派发不同的action
  const dispatch = useCallback((action) => {
    const { type, payload} = action;
    switch (type) {
      case 'set':
        setTodos(payload);
        break;

      // 添加待办事件的方法
      case 'add':
        setTodos(todos => [...todos, payload]);
        break;

      // 删除待办事件的方法 
      case 'remove':
        setTodos(todos => todos.filter((todo) => {
          return todo.id !== payload
          })
        )
        break;

      // 修改待办事件状态的方法
      case 'toggle':
        setTodos(todos => 
          todos.map((todo) => {
            return todo.id === payload
                    ? {
                      ...todo,
                      complete: !todo.complete
                    }
                    : todo;
          })
        )
        break;
      default:
        break;
    }
  }, [])

  useEffect(()=> {
    const todos = JSON.parse(localStorage.getItem(LS_KEY) || [])
    dispatch(creatSet(todos))
  }, [dispatch])

  useEffect(() => {
    localStorage.setItem(LS_KEY, JSON.stringify(todos));
  }, [todos])

  return (
    <div className='todo-list'>
      <Control {
        ...bindActionCreators({
          addTodo: creatAdd
        }, dispatch)
      }/>
      <Todos {
        ...bindActionCreators({
          removeTodo: creatRemove,
          toggleTodo: creatToggle
        }, dispatch)
      }
      todos={todos}/>
    </div>
  )
}

export default TodoList;
