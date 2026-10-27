import {zodResolver} from "@hookform/resolvers/zod"
import { changePasswordSchema , type ChangePasswordSchemaType} from '../../Schemas/auth.schema';
import  axios  from 'axios';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { useState } from 'react';


function ChangePassword({onClose}:{onClose: () => void}) {
    const[isLoading, setisLoading]=useState(false);

    const form = useForm<ChangePasswordSchemaType>({ 
        defaultValues: { 
            password: "",
            newPassword: "",
        },
        resolver: zodResolver(changePasswordSchema),

        mode :"onChange"
      });
      
      const { register, handleSubmit} = form;

       function handleChangePassword(changePasswordrData:ChangePasswordSchemaType){
        setisLoading(true); 
        axios.patch(`https://route-posts.routemisr.com/users/change-password`, changePasswordrData,{
            headers:{Authorization: `Bearer ${localStorage.getItem("userToken")}`}
        }) 
        .then((response) =>{
           if(response.data.success){
            toast.success("Password Changed Successfully", { style: { zIndex: 999 } });
            onClose()
           }
        })
        .catch((error)=>{
            console.log(error.response.data.message);
           toast.error(error.response.data.message) 
        }).finally(() =>{
            setisLoading(false) 
        })
      }
  return (
    <>
    <div onClick={onClose} className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
      <div onClick={(e) => e.stopPropagation()} className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="mx-auto xl:w-full bg-white rounded-3xl my-6 p-6 shadow-xl">
           <span className="text-2xl font-bold my-3">Change Your Password</span>
           <form onSubmit={handleSubmit(handleChangePassword)} className="max-w-md mx-auto mt-10">
                <div className="relative z-0 w-full mb-5 group">
                    <input type="password"
                        {...register("password")}
                        id="password" 
                        className="block py-2.5 px-0 w-full text-sm text-heading bg-transparent border-0 border-b-2 border-default-medium appearance-none focus:outline-none focus:ring-0 focus:border-brand peer" 
                        placeholder="" 
                    />
                    <label htmlFor="password"
                        className="absolute text-sm text-body duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-left peer-focus:insert-s-0 peer-focus:text-fg-brand peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">
                        Current Password
                    </label>   
                </div>
                <div className="relative z-0 w-full mb-5 group">
                    <input type="password"
                        {...register("newPassword")} 
                        id="newPassword" 
                        className="block py-2.5 px-0 w-full text-sm text-heading bg-transparent border-0 border-b-2 border-default-medium appearance-none focus:outline-none focus:ring-0 focus:border-brand peer" 
                        placeholder="" 
                    />
                    <label htmlFor="newPassword"
                        className="absolute text-sm text-body duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-left peer-focus:insert-s-0 peer-focus:text-fg-brand peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">
                        New Password
                    </label>
                </div>
                <button 
                    disabled={isLoading}
                    type="submit" 
                    className="text-white bg-[#2a4ca1] disabled:bg-slate-900 disabled:text-white disabled:cursor-not-allowed block w-full rounded-xl hover:bg-[#19316e] box-border border border-transparent hover:bg-brand-strong focus:ring-4 focus:ring-brand-medium shadow-xs font-medium leading-5 rounded-base  px-4 py-2.5 focus:outline-none text-lg">
                    {isLoading ? "Loading ..." : "Change Password"}
              </button>
            </form>
        </div>
       </div>
    </div> 
    </>
  )
}

export default ChangePassword
