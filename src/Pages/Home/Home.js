import React from 'react';
import './Home.css'
const Home = () => {
    return (
        <div className='card w-96 bg-base-100 shadow-xl my-20 mx-auto'>
        <div className="card-body">
           <h1>Todo List</h1>
            <form >
                <input type="text" />
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
        </div>
    );
};

export default Home;