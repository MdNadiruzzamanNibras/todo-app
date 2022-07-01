import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { toast } from 'react-toastify';
import auth from './firebase.init';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

const Todolist = () => { 
    const [user] = useAuthState(auth);
    const [first, setFirst] = useState('');
    const navigate = useNavigate()
    const additem = async(e) =>{
        e.preventDefault();
        const todo = e?.target?.todo?.value
        const todolist={
            email: user?.email,
            todo: todo
        }
        fetch('http://localhost:5000/todos',{
            method:'POST',
            headers: {
                'content-type': 'application/json',
            },
            body:JSON.stringify(todolist)
        })
        .then(res=>res.json())
        .then(data=>{
            if(data.insertedId){
                toast.success('Great add your todo item')
            }
            else{
                toast.error('Something is Wrong')
                
            }

        })
    }
    const [items, setitems] =useState([])
    useEffect(()=>{
        fetch(`https://honest-eh-82732.herokuapp.com/todo?email=${user?.email}`,{
            method:'GET'
          })
          .then(res =>  res.json())
          .then(data=>setitems(data))
    },[items])
    const deleteTodo =id=>{
        const processed = window.confirm('Are you sure item')
        if(processed){
            const url= `http://localhost:5000/tododel/${id}`
            fetch(url,{
                method:'DELETE',
               
               
            })
            .then(res=> res.json())
            .then(data=>{
                console.log(data);
              toast(data);
             const remaining = items.filter(item => item._id !== id);
             setitems(remaining);
            })
        }
       
     }  
     const updateNavigate=()=>{
        navigate('/update')
    }
    return (
        <div className='card w-96 bg-base-100 shadow-xl my-20 mx-auto' >
        <div className="card-body">
           <h1>Todo List</h1>
            <form onSubmit={additem}>
                <input type="text" name='todo' className="input input-bordered w-full max-w-xs"  value={first}
          onChange={e => setFirst(e.target.value)}
          autoComplete="off" />
                <button>Add</button>
            </form>
            <div className='todo-list'>
                {items && items?.map(item=><div className='flex justify-between align-middle my-1'>
                 <input type="checkbox" name="" id=""  className='mr-1'/>
                    <p className='item-content'>{item.todo}</p>
                    <button className='update' onClick={updateNavigate}>update</button>
                    <button onClick={()=>deleteTodo(item._id)} className='bg-red-600 mx-2 px-4 bodder text-white'>Delete</button>
                </div>)}
               
            </div>
        </div>
        <ToastContainer/>
        </div>
    );
};

   

export default Todolist;