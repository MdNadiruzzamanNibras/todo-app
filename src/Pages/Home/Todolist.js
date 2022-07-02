import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { toast } from 'react-toastify';
import auth from './firebase.init';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

const Todolist = () => { 
    const [user] = useAuthState(auth);
    const [enterkey, setEnterkey] = useState('');
    const navigate = useNavigate()
    const additem = async(e) =>{
        e.preventDefault();
        const todo = e?.target?.todo?.value
        const todolist={
            email: user?.email,
            todo: todo
        }
        fetch('https://honest-eh-82732.herokuapp.com/todos',{
            method:'POST',
            headers: {
                'content-type': 'application/json',
            },
            body:JSON.stringify(todolist)
        })
        .then(res=>res.json())
        .then(data=>{
            if(data.insertedId){
                toast.success('Great add your task item')
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
            const url= `https://honest-eh-82732.herokuapp.com/tododel/${id}`
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
           <h1 className='text-center text-3xl font-bold'>Task List</h1>
            <form onSubmit={additem}>
                <input type="text" name='todo' className="input input-bordered w-full max-w-xs"  value={enterkey}
          onChange={e => setEnterkey(e.target.value)}
          autoComplete="off" />
                <button className='btn btn-active my-3 flex justify-center'>Add Task</button>
            </form>
            <div className='Task-list'>
                {items && items?.map(item=><div className='flex justify-between align-middle text-lg font-semibold my-1'>
                 <input type="checkbox" name="" id=""  className='mr-1'/>
                    <p className='item-content'>{item.todo}</p>
                    <button style={{borderRadius: '50px'}} className='btn-sm bg-green-600 px-5 text-white' onClick={updateNavigate}>Edit</button>
                    <button style={{borderRadius: '50px'}} onClick={()=>deleteTodo(item._id)} className='bg-red-600 mx-2 px-4 btn-sm bodder text-white'>Delete</button>
                </div>)}
               
            </div>
        </div>
        <ToastContainer/>
        </div>
    );
};

   

export default Todolist;