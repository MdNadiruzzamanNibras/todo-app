import React from 'react';
import { useForm } from "react-hook-form";
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import auth from '../Home/firebase.init';
const Login = () => {
    const { register, formState: { errors }, handleSubmit } = useForm();
    const navigate = useNavigate()
    const location = useLocation()
    let from = location.state?.from?.pathname || "/";
    const [
        signInWithEmailAndPassword,
        user,
        loading,
        error,
      ] = useSignInWithEmailAndPassword(auth);
    const onSubmit = data => {
        signInWithEmailAndPassword(data?.email , data?.password)
    };
    
    
   
    if(user){
      navigate(from, { replace: true });
    }
    if(loading){
      return <p>Loading...</p>
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
        
          
          <input  className='btn w-full max-w-xs text-black' type="submit" value="Login" />
    </form>
    {errorMassage}
    <div className="divider text-black">OR</div>
 
    <p><small>New to The AutoMobile <Link  className='text-blue-600' to='/signup'>Create Account</Link></small></p>

    </div>
  </div>
  </div>
            
       
    );
};

export default Login;

