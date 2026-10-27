import { type CommentType } from "../../Types/Comment.type"
import { AiOutlineLike } from "react-icons/ai";
import { FaRegComment } from "react-icons/fa";
import { TiArrowSortedDown } from "react-icons/ti";
import { useState } from 'react';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import ReplyCreation from "../ReplyCreation/ReplyCreation";
import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { useQueryClient } from '@tanstack/react-query';
import { AiFillLike } from "react-icons/ai";
import { BsThreeDots } from "react-icons/bs";
import { FaPencil } from "react-icons/fa6";
import { FaTrash } from "react-icons/fa";
import { FaSpinner } from "react-icons/fa";
import CommentUpdate from './../CommentUpdate/CommentUpdate';



export default function Comment({comment, postId, commentId, queryKey, loginUserId, commentMakerId} : {comment : CommentType, postId:string, commentId:string, queryKey:string[], loginUserId:string, commentMakerId:string}) {
  const [isReplyShown, setisReplyDhown] = useState(false);

  function showReplies(){
    setisReplyDhown(!isReplyShown);
  }

  function getCommentReplies(){
    return axios.get(`https://route-posts.routemisr.com/posts/${postId}/comments/${commentId}/replies?page=1&limit=10`,{
     headers:{ Authorization: `Bearer ${localStorage.getItem("userToken")}`}
    }
    )
  }

  const {data:replies} = useQuery({
    queryKey: ["getCommentReplies", commentId],
    queryFn : getCommentReplies,
  })


  const [isReplyCreation, setisReplyCreation] = useState(false);

  function showReplyCreation(){
    setisReplyCreation(!isReplyCreation)
  }

    const [isOpen, setisOpen] = useState(false);


   function handleDeleteComment(){
   return axios.delete(`https://route-posts.routemisr.com/posts/${postId}//comments/${commentId}`,{
    headers: {Authorization: `Bearer ${localStorage.getItem("userToken")}`}
   })
  }

  const {mutate:deleteComment, isPending} = useMutation({
    mutationFn: handleDeleteComment,
    onSuccess: (res)=>{
     query.invalidateQueries({queryKey: queryKey});
     toast.success(res.data.message);
    },
    onError: (error)=>{
     toast.error(error.message);
    }
  })
  

  const isCommentLiked = comment.likes?.includes(loginUserId);

  function makeCommentLiked(){
    return axios.put(`https://route-posts.routemisr.com/posts/${postId}/comments/${commentId}/like`,{},{
     headers:{ Authorization: `Bearer ${localStorage.getItem("userToken")}`}
    }
    )
  }

  const query = useQueryClient();

  const {mutate:likeComment} = useMutation({
    mutationFn: makeCommentLiked,
    onSuccess: (res)=>{
     query.invalidateQueries({queryKey: queryKey});
     toast.success(res.data.message);
    },
    onError: (error)=>{
     toast.error(error.message);
    }
  })
 
  const [isUpdateOpen, setisUpdateOpen] = useState(false);

  function showUpdatePopUp(){
    setisUpdateOpen(true);  
  }

  return (
    <>
      <div className="comment mt-5 p-3">
        <div className="flex justify-between">
          <div className="flex gap-4">
            <img src={comment?.commentCreator.photo} className="w-10 h-10 rounded-full border-2 border-white " alt="post-owner-image"/>
            <div>
              <p className="font-bold ">{comment?.commentCreator.name}</p>
              <p className="text-sm text-slate-500 ">{comment?.createdAt}</p>
              <p className="comment-content pt-3">{comment?.content}</p>
              {comment?.image ? <img src={comment?.image} alt={comment?.content}  /> : ""} 
              <div className="mt-4 mb-1 flex gap-5">
                <button onClick={()=> likeComment()} className="text-xl cursor-pointer">
                  {isCommentLiked ?
                  <>
                  <AiFillLike/>
                  </>:
                  <>
                  <AiOutlineLike/>
                  </>}
                  
                </button>
                <button onClick={()=>showReplyCreation()} className="cursor-pointer text-sm"><FaRegComment className="inline-block text-xl me-2"/>make a reply</button>
              </div>
              <button onClick={()=>showReplies()} className="mt-3 text-md cursor-pointer text-[#1a46cb]"><TiArrowSortedDown className="inline-block text-lg"/> see replies</button>
              {isReplyCreation? 
              <>
                <ReplyCreation postId={postId} queryKey={["getCommentReplies", commentId]} commentId={commentId}/>
              </>: ""}
              {isReplyShown? 
              <>
              {replies?.data.data.replies.map((reply: CommentType)=>{
                return(
                <div key={reply._id} className="flex gap-4 itesm-center mt-3">
                  <img src={reply?.commentCreator.photo} className="w-10 h-10 rounded-full border-2 border-white " alt="post-owner-image"/>
                  <div>
                      <p className="font-bold ">{reply?.commentCreator.name}</p>
                      <p className="text-sm text-slate-500 ">{reply?.createdAt}</p>
                      <p className="comment-content pt-3">{reply?.content}</p>
                      {reply?.image ? <img src={reply?.image} alt={reply?.content}  /> : ""} 
                  </div>
                </div>
                )
              })}
              </>
              : ""}
            </div>
          </div>
          <div >
            {loginUserId === commentMakerId &&  
            <div className="relative">
              <button type="button" onClick={() => setisOpen(!isOpen)} className="cursor-pointer absolute inset-e-5 top-7">
                <BsThreeDots className="text-2xl"/>
              </button>
              {isOpen &&
              <>
                <ul className="bg-slate-300 rounded-2xl text-slate-800 absolute -inset-e-7 top-14">
                  <button onClick={()=>showUpdatePopUp()} className="flex gap-7 p-3 hover:bg-slate-700 rounded-t-2xl hover:text-white cursor-pointer">Edit <FaPencil/></button> 
                  {isUpdateOpen && <CommentUpdate onClose={() => setisUpdateOpen(false)} postId={postId} queryKey={queryKey} commentId={commentId} content={comment.content} image={comment.image} />}
                  <li>
                    <button onClick={()=>deleteComment()} disabled={isPending} className="flex disabled:cursor-not-allowed disabled:bg-slate-800 gap-3 p-3 hover:bg-slate-700 rounded-b-2xl hover:text-white cursor-pointer">
                      {isPending ? 
                        <> Pending <FaSpinner className="animate-spin"/>
                        </>
                        : 
                        <>Delete <FaTrash/>
                        </> }
                    </button>
                  </li>
                </ul>
              </>}
            </div>} 
          </div>
        </div>
      </div>
    </>
  )
}
