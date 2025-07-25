import React, { useEffect, useRef,useState} from 'react'
import todo_icon from '../assets/todo_icon.png'
import TodoItems from './todoitems.jsx'

const Todo = () => {

    const[todoList, setTodoList] = useState(localStorage.getItem("todos")? JSON.parse(localStorage.getItem("todos")) : []);

    const inputRef = useRef();

const add = ()=> {
    const inputText = inputRef.current.value.trim();

if (inputText === "") {
    return null;
}

    const newTodo = {
id: Date.now(),
text: inputText,
iscomplete: false,
}
setTodoList((prev)=> [...prev, newTodo]);
inputRef.current.value = "";
}

const deleteTodo =(id) => {
    setTodoList((prevTodos) => {
        return prevTodos.filter((todo) => todo.id !== id);
    });
}
const toggleTodo = (id) => {
    setTodoList((prevTodos) => {
        return prevTodos.map((todo) => {
            if (todo.id === id) {
                return { ...todo, iscomplete: !todo.iscomplete };
            }
            return todo;
        });
    });
}
useEffect(()=> {
    localStorage.setItem("todos", JSON.stringify(todoList));
},[todoList])


  return (
    <div className='bg-white place-self-center w-11/12 max-w-md
    flex flex-col p-7 min-h-[550px] rounded-xl'>
        {/* title */}
        <div className='flex items-center  mt-7 gap-2'>
            <img className='w-8' src={todo_icon} alt="" />
            <h1 className='text-3xl font-semibold'>To-Do List</h1>'
    </div>

    {/* input field */}
    <div className='flex items-center my-7 bg-gray-200 rounded-full'>
        <input ref={inputRef} className='bg-transparent border-0 outline-none flex-1 h-14 pl-6 pr-2 placeholder:text-slate-600' type="text" placeholder="Add a new task"/>
        <button onClick={add} className='border-none rounded-full bg-blue-500 w-30 h-10 text-white text-lg font-medium cursor-pointer'>ADD +</button>
    </div>
    {/*todo items */}
    <div>
        {todoList.map((item, index)=>{
            return <TodoItems key={index} text={item.text} id={item.id} iscomplete={item.iscomplete} deleteTodo={deleteTodo} toggle={toggleTodo} />
        })}
        
    </div>
    </div>
  )
}

export default Todo