import React, { useState, useRef, useCallback, useEffect } from 'react';
import './App.css';

let idSeq = Date.now();

let LS_KEY = '$_todoList_'

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
  const { removeTodo, toggleTodo, todos } = props
  console.log(todos)
  return (
    <ul className='todos'>
        {
          todos.map(todo => {
            return (<TodoItem
                      key={todo.id}
                      removeTodo={removeTodo}
                      toggleTodo={toggleTodo}
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

  // 添加待办事件的方法
  const addTodo = useCallback((todo) => {
    setTodos(todos => [...todos, todo]);
  }, []);

  // 删除待办事件的方法
  const removeTodo = useCallback((id) => {
    setTodos(todos => todos.filter((todo) => {
        return todo.id !== id
      })
    )
  }, []);

  // 修改待办事件状态的方法
  const toggleTodo = useCallback((id) => {
    setTodos(todos => 
      todos.map((todo) => {
        return todo.id === id
                ? {
                  ...todo,
                  complete: !todo.complete
                }
                : todo;
      })
    )
  }, []); 

  useEffect(()=> {
    const todos = JSON.parse(localStorage.getItem(LS_KEY) || [])
    setTodos(todos)
  }, [])

  useEffect(() => {
    localStorage.setItem(LS_KEY, JSON.stringify(todos));
  }, [todos])

  return (
    <div className='todo-list'>
      <Control addTodo={addTodo}/>
      <Todos removeTodo={removeTodo} toggleTodo={toggleTodo} todos={todos}/>
    </div>
  )
}

export default TodoList;
