import { FiImage, FiSend } from "react-icons/fi";
import { MdCancel } from "react-icons/md";
import { useState, useRef } from 'react';
import axios from 'axios';
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { FaSpinner } from "react-icons/fa6";
import { type ChangeEvent } from "react";
import toast from 'react-hot-toast';


export default function PostCreation({userImage, queryKey}:{userImage?:string, queryKey:string[]}) {
 const [isUpload, setisUpload]= useState("");

 const postFormData = new FormData();

 const query = useQueryClient();

 const textInput = useRef<HTMLTextAreaElement | null>(null);
 const imageInput = useRef<HTMLInputElement | null>(null);

 function handleCreatePost(){
    const file = imageInput.current?.files?.[0];

    if(textInput.current?.value === "" && imageInput.current?.value === "" ) return;

    if(textInput.current?.value){
     postFormData.append("body", textInput.current?.value);
    }

    if(file){
     postFormData.append("image", file);
    }

    mutate();
 }
 
 function clearInput(){
    if (textInput.current) textInput.current.value = "";
    if (imageInput.current) imageInput.current.value = "";   
    setisUpload("")
 }
   
 const {isPending, mutate} = useMutation({
  mutationFn: createPost,
  onSuccess: (res)=>{
    console.log(res);
    query.invalidateQueries({queryKey: queryKey})
    clearInput();
    toast.success(res.data.message, { style: { zIndex: 999 } });
  },
  onError(err){
    toast.error(err.message);
  }
})

 function createPost(){
  return axios.post(`https://route-posts.routemisr.com/posts`, postFormData,{
    headers: { Authorization: `Bearer ${localStorage.getItem("userToken")}`}
  })
 }

 function handleImagePreview(e : ChangeEvent<HTMLInputElement>){
    const file = e.target.files?.[0];
    if (!file) return;
    setisUpload(URL.createObjectURL(file));
 }

  return (
    <>
    <div className="mx-auto xl:w-[50%] bg-white rounded-3xl my-6 p-6 shadow-xl">
      <form>
        <div className="flex gap-4">
          <img
            src={userImage}
            alt=""
            className="w-15 h-15 rounded-full border-2 border-white shrink-0"
          />
          <textarea
            ref={textInput} 
            rows={3}
            placeholder="What's on your mind?"
            className="w-full resize-none p-3 bg-slate-100 border border-[#98a7a9] text-lg rounded-2xl shadow-xs placeholder:text-slate-500 focus:outline-none focus:ring-4 focus:ring-slate-200"
          />
        </div>
 
        {isUpload ?
        <>
          <div className="mt-4 ms-19 flex justify-center">
            <div className="relative">
              <img 
                src={isUpload} alt="" className="rounded-2xl" />
              <MdCancel onClick={()=> setisUpload("")} className="absolute top-2 right-2 text-2xl cursor-pointer text-white drop-shadow hover:scale-110 transition" />
            </div>
          </div>
        </> :
        <>
          <div className=" relative mt-4 ms-19 flex items-center justify-center h-40 rounded-2xl border-2 border-dashed border-slate-300 bg-slate-50 text-slate-400 text-sm">
            Image preview appears here
          </div>
        </>
        }
 
        <hr className="my-5 border-t border-gray-200" />
       
        <div className="flex items-center justify-between">
          <label className="flex items-center gap-2 px-4 py-2 rounded-2xl border border-slate-400 text-[#656066] font-bold cursor-pointer hover:bg-slate-100 transition">
            <FiImage className="text-lg" />
            Photo
            <input ref={imageInput}  onChange={handleImagePreview} type="file" accept="image/*" hidden />
          </label>
 
          <button
            type="button"
            disabled= {isPending}
            onClick ={()=> handleCreatePost()}
            className="flex items-center gap-2 px-6 py-2 rounded-2xl text-white font-medium bg-[#1C398E] hover:bg-[#152967] cursor-pointer shadow-xs focus:outline-none focus:ring-4 focus:ring-slate-300 disabled:bg-slate-700 disabled:cursor-not-allowed"
          >
            {isPending ? 
            <>
            Loading 
            <FaSpinner className="animate-spin"/>
            </>:
            <>
            Post
            <FiSend />
            </>}
          </button>
        </div>
      </form>
    </div>
   </>
  )
}
