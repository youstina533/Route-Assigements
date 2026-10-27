import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import axios from 'axios';
import { FiShare } from "react-icons/fi";
import { useMutation } from '@tanstack/react-query';
import { useRef } from 'react';



 export default function CommentUpdate({onClose, postId, content, image, queryKey, commentId}: {onClose: () => void, postId:string , content:string, image: string, queryKey:string[], commentId:string}) {

    const CommentUpdateformData = new FormData();

    const query = useQueryClient();

    const textInput = useRef<HTMLInputElement | null>(null);
    const imageInput = useRef<HTMLInputElement | null>(null);

    function handleUpdateComment(){ 
     const file = imageInput.current?.files?.[0];

        if(textInput.current?.value === "" && imageInput.current?.value === "" ) return;

        if(textInput.current?.value){
           CommentUpdateformData.append("content", textInput.current?.value);
        }

        if(file){
           CommentUpdateformData.append("image", file);
        }

        mutate();
    }
    
    function clearInput(){
        if (textInput.current) textInput.current.value = "";
        if (imageInput.current) imageInput.current.value = "";   
    }


    function UpdateComment(){
        return axios.put(`https://route-posts.routemisr.com/posts/${postId}/comments/${commentId}`, CommentUpdateformData ,{
            headers :{ Authorization: `Bearer ${localStorage.getItem("userToken")}` }
        });
    }

    const {isPending, mutate} = useMutation({
        mutationFn : UpdateComment,
        onSuccess: (res) =>{
            clearInput()
            query.invalidateQueries({queryKey: queryKey })
            query.invalidateQueries({queryKey: ["getUserData"]});
            toast.success(res.data.message, { style: { zIndex: 999 } });
            onClose()
        },
        onError:(err) => {
            toast.error(err.message);
        },
        onSettled:() => {
        }
    })

   
   return (
     <>
    <div onClick={onClose} className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
      <div onClick={(e) => e.stopPropagation()} className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="mx-auto xl:w-full bg-white rounded-3xl my-6 p-6 shadow-xl">
            <span className="text-2xl font-bold my-4">Update Comment</span>
            <form className="mt-3">  
                <div className=" mx-10 relative">
                    <input defaultValue={content} ref={textInput} type="text" id="commentCreation" className="inline-block w-full p-2 ps-9 bg-slate-100 border border-[#98a7a9] text-lg rounded-2xl focus:ring-brand focus:border-brand shadow-xs placeholder:text-body" 
                        
                    />
                    <label className="absolute inset-e-26 top-1/2 -translate-y-1/2 border border-slate-400 flex items-center justify-center w-8 h-8 bg-white rounded-full cursor-pointer hover:bg-slate-100 transition">
                        <FiShare className="text-lg" />
                        <input type="file" hidden  ref={imageInput} defaultValue={image}
                        />
                    </label>
                    <button onClick={()=> handleUpdateComment()} type="button" disabled={isPending} className=" disabled:bg-slate-700 disabled:cursor-not-allowed cursor-pointer absolute inset-e-1.5 me-3 bottom-1.5 text-white bg-[#1C398E]  hover:bg-[#152967] box-border border border-transparent focus:ring-4 focus:ring-brand-medium shadow-xs font-medium leading-5 rounded-2xl text-xs px-3 py-1.5 focus:outline-none">
                        {isPending ? "Loading" : "Submit" } 
                    </button>
                </div>
            </form>
        </div>
       </div>
     </div>
     </>
   )
 }
 