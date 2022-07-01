import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../Home/firebase.init';

const Complete = () => {
    const [user] = useAuthState(auth);
    const [items, setitems] =useState([])
    useEffect(()=>{
        fetch(`http://localhost:5000/complete?email=${user?.email}`,{
            method:'GET'
          })
          .then(res =>  res.json())
          .then(data=>setitems(data))
    },[items])
    return (
        <div className='todo-list'>
                {items.map(item=><div className='flex justify-between align-middle my-1'>
                    <p className='item-content'>{item.todo}</p>
                    <button className='update'>update</button>
                    <button className='delete'>delete</button>
                </div>)}
               
            </div>
    );
};

export default Complete;