import React, { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { toast } from 'react-toastify';
import auth from './firebase.init';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Home.css'
const Home = () => {
    const [item, setitem] =useState('')
    const [user] = useAuthState(auth);
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
                toast.success('Great add your order and see my order page')
            }
            else{
                toast.error('Something is Wrong')
                
            }

        })
    }
    return (
        <div className='card w-96 bg-base-100 shadow-xl my-20 mx-auto'>
        <div className="card-body">
           <h1>Todo List</h1>
            <form onSubmit={additem}>
                <input type="text" name='todo' className="input input-bordered w-full max-w-xs"  />
                <button>Add</button>
            </form>
            <div className='todo-list'>
                <div className='todo-item'>
                    <p className='item-content'>item-1</p>
                    <button className='update'>update</button>
                    <button className='delete'>delete</button>
                </div>
                <div className='todo-item'>
                    <p className='item-content'>item-2</p>
                    <button className='update'>update</button>
                    <button className='delete'>delete</button>
                </div>
                <div className='todo-item'>
                    <p className='item-content'>item-3</p>
                    <button className='update'>update</button>
                    <button className='delete'>delete</button>
                </div>
            </div>
        </div>
        <ToastContainer/>
        </div>
    );
};

export default Home;