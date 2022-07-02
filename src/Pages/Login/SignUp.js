import React from 'react';
import { useCreateUserWithEmailAndPassword, useUpdateProfile } from 'react-firebase-hooks/auth';
import { useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';
import auth from '../Home/firebase.init';
import SocialLogin from './SocialLogin';

const SignUp = () => {
    const { register, formState: { errors }, handleSubmit } = useForm();
    const navigate = useNavigate()
    const location = useLocation()
    let from = location.state?.from?.pathname || "/";
    const [
      createUserWithEmailAndPassword,
      user,
      loading,
      error,
    ] = useCreateUserWithEmailAndPassword(auth);
  const onSubmit = data => {
   createUserWithEmailAndPassword(data?.email, data?.password)
     
  };


    if(loading){
      return <p>Loading...</p>
    }
    if(user){
      navigate(from, { replace: true });
    }
    let errorMassage
        if(error){
             errorMassage = <div className='text-red-500'>Error: {error?.message}</div>
        }
    return (
        <div   className='flex justify-center items-center min-h-screen'>
        <div  className="card w-96 bg-base-100 shadow-xl ">
<div  className="card-body">
<form onSubmit={handleSubmit(onSubmit)}>
    <div  className="form-control w-full max-w-xs">
      <label  className="label">
        <span  className="label-text text-black">Name</span>
        
      </label>
      <input
                            type="name"
                            placeholder="Your Name"
                             className="input input-bordered w-full max-w-xs"
                            {...register("name", {
                              required: {
                                 value: true,
                                 message:'Name is required'
                              }
                              
                          })}
                        />
      <label  className="label">
    
      </label>
      </div>
    <div  className="form-control w-full max-w-xs">
      <label  className="label">
        <span  className="label-text text-black">Email</span>
        
      </label>
      <input
                            type="email"
                            placeholder="Your Email"
                             className="input input-bordered w-full max-w-xs"
                            {...register("email", {
                                required: {
                                   value: true,
                                   message:'Email is required'
                                }
                               
                            })}
                        />
      <label  className="label">
      {errors?.email?.type === 'required' && <span  className="label-text-alttext-red-500">{errors?.email?.message}</span>}  
      </label>
      </div>
    <div  className="form-control w-full max-w-xs">
      <label  className="label">
        <span  className="label-text text-black">Password</span>
        
      </label>
      <input
                            type="password"
                            placeholder="Password"
                             className="input input-bordered w-full max-w-xs"
                            {...register("password", {
                                required: {
                                   value: true,
                                   message:'password is required'
                                },
                                minLength: {
                                    value: 6,
                                    message: 'password min length 6 caractor'
                                }
                            })}
                        />
      <label  className="label">
      {errors?.password?.type === 'required' && <span  className="label-text-alttext-red-500">{errors?.password?.message}</span>}
      {errors?.password?.type === 'minLength' && <span  className="label-text-alttext-red-500">{errors?.password?.message}</span>}
      
        
      </label>
      </div>
    
      
      <input  className='btn w-full max-w-xs text-white' type="submit" value="Signup" />
</form>
{errorMassage}
<div className="divider text-black">OR</div>
   <SocialLogin/>
  
</div>
</div>
</div>
    );
};

export default SignUp;