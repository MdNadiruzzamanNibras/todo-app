import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import auth from '../Home/firebase.init';

const Complete = () => {
    const [user] = useAuthState(auth);
    const [items, setitems] =useState([])
    const navigate = useNavigate()
    useEffect(()=>{
        fetch(`https://honest-eh-82732.herokuapp.com/complete?email=${user?.email}`,{
            method:'GET'
          })
          .then(res =>  res.json())
          .then(data=>setitems(data))
    },[items])
    const homenavi= ()=>{
        navigate('/')
    }
    return (
        <div className='w-52 mx-auto bg-white'>
              <h1 className='text-center text-3xl font-bold'>Task List</h1>
                {items.map(item=>
                    <p className='text-center text-lg font-semibold my-1'>{item.todo}</p>
                )}
               <button className='btn btn-sm mt-4 flex justify-center' onClick={homenavi}>Back Home</button>
            </div>
    );
};

export default Complete;