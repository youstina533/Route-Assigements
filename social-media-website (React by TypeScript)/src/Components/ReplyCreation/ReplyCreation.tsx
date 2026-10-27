import { FiShare } from "react-icons/fi";
import { useForm } from 'react-hook-form';
import  axios  from 'axios';
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from 'react-hot-toast';



export default function ReplyCreation({postId, queryKey, commentId}: {postId : string, queryKey: string[] ,commentId:string }) {

    const replyForm = useForm({
        defaultValues:{
            content: "",
            image: "",
        },
    })

    const ReplyformData =  new FormData();

    const {register, handleSubmit, reset} = replyForm;

    const query = useQueryClient();

    function createReply(){
        return axios.post(`https://route-posts.routemisr.com/posts/${postId}/comments/${commentId}/replies`, ReplyformData ,{
            headers :{ Authorization: `Bearer ${localStorage.getItem("userToken")}` }
        });
    }


    const {isPending, mutate} = useMutation({
        mutationFn : createReply,
        onSuccess: (res) =>{
            reset();
            query.invalidateQueries({queryKey: queryKey })
            toast.success(res.data.message, { style: { zIndex: 999 } });
        },
        onError:(err) => {
            toast.error(err.message);
        },
        onSettled:() => {
        }
    })

    function handleCreateReply(formResponseObject: {content: string, image: string}){ 
        if(!formResponseObject.content && !formResponseObject.image){
            return
        }
        if(formResponseObject.content){
            ReplyformData.append("content",formResponseObject.content); 
        }
        if(formResponseObject.image){
           ReplyformData.append("image",formResponseObject.image[0]); 
        }
        mutate()
    }

  return (  
    <>
       <form className="mt-3" onSubmit={handleSubmit(handleCreateReply)}>   
            <div className=" mx-10 relative">
                <input type="text" id="commentCreation" className="inline-block w-full p-2 ps-9 bg-slate-100 border border-[#98a7a9] text-lg rounded-2xl focus:ring-brand focus:border-brand shadow-xs placeholder:text-body" placeholder="Write a Reply"  
                  {...register("content")}

                />
                <label className="absolute inset-e-26 top-1/2 -translate-y-1/2 border border-slate-400 flex items-center justify-center w-8 h-8 bg-white rounded-full cursor-pointer hover:bg-slate-100 transition">
                    <FiShare className="text-lg" />
                    <input type="file" hidden 
                      {...register("image")}
                    />
                </label>
                <button disabled={isPending} type="submit" className=" disabled:bg-slate-700 disabled:cursor-not-allowed cursor-pointer absolute inset-e-1.5 me-3 bottom-1.5 text-white bg-[#1C398E]  hover:bg-[#152967] box-border border border-transparent focus:ring-4 focus:ring-brand-medium shadow-xs font-medium leading-5 rounded-2xl text-xs px-3 py-1.5 focus:outline-none">
                   {isPending ? "Loading" : "Submit" } 
                </button>
            </div>
        </form>

    </>
  )
}
