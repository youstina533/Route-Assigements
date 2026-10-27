import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod"
import { loginSchema, type loginSchemaType } from './../../../Schemas/auth.schema';
import axios from "axios"
import { Link, useNavigate} from "react-router-dom";
import { useContext, useState } from "react";
import {AuthContext} from "../../../Context/AuthContextValue"
import toast from 'react-hot-toast';
import {Helmet} from "react-helmet"


export default function LoginFormReactHookFormAndZod() {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const {setuserToken} = useContext(AuthContext);
  
      const form = useForm<loginSchemaType>({ 
        defaultValues: {
          email: "",
          password: "", 
        },
        resolver: zodResolver(loginSchema),

        mode :"onChange"
      });
  
      const { register, handleSubmit, formState} = form; 
      function handlogin(loginrData:loginSchemaType){ 
       console.log(loginrData);
        setIsLoading(true);
        axios.post(`https://route-posts.routemisr.com/users/signin`, loginrData) 
        .then((response) =>{
           if(response.data.success){
            localStorage.setItem("userToken", response.data.data.token); 
            setuserToken(response.data.data.token)
            toast.success("Login Successfully", { style: { zIndex: 999 } });
            navigate("/");
           }
        })
        .catch((error)=>{
            console.log(error.response.data.message);
            toast.error(error.response.data.message , { style: { zIndex: 999 } });
        }).finally(() =>{
            setIsLoading(false) 
        })
      }
  
    return (
      <>
      <Helmet>
        <title>Login</title>
      </Helmet>
        <main className="mt-30 bg-white p-5 rounded-4xl shadow-xl xl:w-[50%] mx-auto py-10">
         <h1 className="text-6xl text-center font-bold">Login Now</h1>
         <form onSubmit={handleSubmit(handlogin)} className="max-w-md mx-auto mt-10">
              <div className="relative z-0 w-full mb-5 group">
                  <input type="email"
                      {...register("email")} 
                      id="email" 
                      className="block py-2.5 px-0 w-full text-sm text-heading bg-transparent border-0 border-b-2 border-default-medium appearance-none focus:outline-none focus:ring-0 focus:border-brand peer" 
                      placeholder="" 
                   />
                  <label htmlFor="email"
                      className="absolute text-sm text-body duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-left peer-focus:insert-s-0 peer-focus:text-fg-brand peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">
                      Email Address
                   </label>
                   {formState.errors.email?.message && formState.touchedFields.email && (
                      <p className="text-red-500 font-bold">
                          {formState.errors.email?.message}
                      </p>
                   )}
              </div>
              <div className="relative z-0 w-full mb-5 group">
                  <input type="password"
                      {...register("password")} 
                      id="password" 
                      className="block py-2.5 px-0 w-full text-sm text-heading bg-transparent border-0 border-b-2 border-default-medium appearance-none focus:outline-none focus:ring-0 focus:border-brand peer" 
                      placeholder="" 
                   />
                  <label htmlFor="password"
                      className="absolute text-sm text-body duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-left peer-focus:insert-s-0 peer-focus:text-fg-brand peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">
                      Password
                   </label>
                   {formState.errors.password?.message && formState.touchedFields.password && (
                      <p className="text-red-500 font-bold">
                          {formState.errors.password?.message}
                      </p>
                   )}
              </div>
              <button 
                disabled={isLoading}
                type="submit" 
                className="text-white bg-[#2a4ca1] disabled:bg-slate-900 disabled:text-white disabled:cursor-not-allowed block w-full rounded-xl hover:bg-[#19316e] box-border border border-transparent hover:bg-brand-strong focus:ring-4 focus:ring-brand-medium shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 mt-8 focus:outline-none">
                {isLoading ? "Loading ..." : "Login"}
              </button>
             <div className="my-2 text-center text-xl text-blue-500 hover:text-blue-700 font-semibold hover:underline cursor:pointer">
                <Link to="/register"> 
                   Don't have an account? Sign Up
                </Link>
             </div>
          </form>
      </main>
      </>
    )
  }
  