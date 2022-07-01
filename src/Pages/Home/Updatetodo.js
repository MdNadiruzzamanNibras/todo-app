import React, { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { toast } from 'react-toastify';
import auth from './firebase.init';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Updatetodo = () => {
    const [user] = useAuthState(auth);
    const [first, setFirst] = useState('');
    const handleupdate = event =>{
        console.log('kdieg');
        event.preventDefault();
        const todo = event?.target?.todo?.value

        const updatetodo={
            todo: todo
        }
        
        fetch(`http://localhost:5000/update/${user?.email}`,
        {
            method:'PUT',
            headers:{
                'content-type': 'application/json',
                
              },
              body:JSON.stringify(updatetodo)
        })
        .then(res=>res.json())
        .then(data=>{
        if(data){
            console.log(data);
            toast('Update your profile')
        }})
        
    }
    return (
        <form onSubmit={handleupdate}>
            <input type="text" name='todo' className="input input-bordered w-full max-w-xs"  value={first}
          onChange={event => setFirst(event.target.value)}
          autoComplete="off" />
          <input className='btn w-full max-w-xs text-white' type="submit" value="Update" />
          <ToastContainer/>
        </form>
    );
};

export default Updatetodo;