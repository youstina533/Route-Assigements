import { AiFillLike } from "react-icons/ai";
import { FaShare } from "react-icons/fa";
import { FaCommentAlt } from "react-icons/fa";
import type { PostType } from "../../Types/Posts.type";
import Comment from './../Comment/Comment';
import { Link, useNavigate } from "react-router-dom";
import axios  from 'axios';
import { useMutation, useQuery } from '@tanstack/react-query';
import type { CommentType } from "../../Types/Comment.type";
import CommentCreation from './../CommentCreation/CommentCreation';
import { BsThreeDots } from "react-icons/bs";
import { FaPencil } from "react-icons/fa6";
import { FaTrash } from "react-icons/fa";
import { useState, useContext } from 'react';
import { AuthContext } from './../../Context/AuthContextValue';
import { toast } from 'react-hot-toast';
import { useQueryClient } from '@tanstack/react-query';
import { FaSpinner } from "react-icons/fa";
import { AiOutlineLike } from "react-icons/ai";
import PostUpdate from './../PostUpdate/PostUpdate';


export default function Post({post, isPostDetails = false, queryKey} : {post:PostType, isPostDetails?:boolean, queryKey:string[] }) {
  const {body, image, user, createdAt, topComment, _id:postId, commentsCount, likesCount, sharesCount,} = post
  const {name, photo, _id:postMakerId} = user
  const [isOpen, setisOpen] = useState(false);
  const {userId: loginUserId} = useContext(AuthContext)
  

  function getPostComments(){
    return axios.get(`https://route-posts.routemisr.com/posts/${postId}/comments?page=1&limit=50`,{
     headers:{ Authorization: `Bearer ${localStorage.getItem("userToken")}`}
    }
    )
  }

  const {data:commentsData} = useQuery({
    queryKey: ["getPostComments", postId],
    queryFn : getPostComments,
    enabled: isPostDetails 
  })



  function handleDeletePost(){
   return axios.delete(`https://route-posts.routemisr.com/posts/${postId}`,{
    headers: {Authorization: `Bearer ${localStorage.getItem("userToken")}`}
   })
  }

  const query = useQueryClient();
  const navigate = useNavigate();

  const {mutate, isPending} = useMutation({
    mutationFn: handleDeletePost,
    onSuccess: (res)=>{
     query.invalidateQueries({queryKey: queryKey});
     query.invalidateQueries({queryKey: ["getUserData"]});
     toast.success(res.data.message);
     if(isPostDetails === true ){
        navigate("/home");
     }
    },
    onError: (error)=>{
     toast.error(error.message);
    }
  })
  
  const isPostLiked = post.likes?.includes(loginUserId);

  function makePostLiked(){
    return axios.put(`https://route-posts.routemisr.com/posts/${postId}/like`,{},{
     headers:{ Authorization: `Bearer ${localStorage.getItem("userToken")}`}
    }
    )
  }

  const {mutate:likePost} = useMutation({
    mutationFn: makePostLiked,
    onSuccess: (res)=>{
     toast.success(res.data.message);
     query.invalidateQueries({queryKey: queryKey});
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
      <div className="mx-auto xl:w-[50%] bg-white rounded-3xl my-6 pb-9 shadow-xl">
        <div className="flex justify-between itesm-center relative">
          <div className="flex gap-4 itesm-center p-6">
            <img src={photo} className="w-15 h-15 rounded-full border-2 border-white " alt="post-owner-image"/>
            <div>
              <p className="font-bold text-xl ">{name}</p>
              <p className="text-sm text-slate-500 ">{createdAt}</p>
            </div>
          </div>
         {loginUserId === postMakerId &&  
          <div className="relative">
              <button type="button" onClick={() => setisOpen(!isOpen)} className="cursor-pointer absolute inset-e-5 top-7">
                <BsThreeDots className="text-2xl"/>
              </button>
              {isOpen &&
              <>
                <ul className="bg-slate-300 rounded-2xl text-slate-800 absolute -inset-e-7 top-14">
                  <li>
                    <button onClick={()=>showUpdatePopUp()} className="flex gap-7 p-3 hover:bg-slate-700 rounded-t-2xl hover:text-white cursor-pointer">
                      Edit <FaPencil/>
                    </button> 
                  </li>
                  {isUpdateOpen && <PostUpdate onClose={() => setisUpdateOpen(false)} queryKey={queryKey} postId={postId} postMaker={user} body={body} image={image} />}
                  <li>
                    <button onClick={()=>mutate()} disabled={isPending} className="flex disabled:cursor-not-allowed disabled:bg-slate-800 gap-3 p-3 hover:bg-slate-700 rounded-b-2xl hover:text-white cursor-pointer">
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
        <div>
          {body && <p className="px-6 py-3 text-lg ">{body}</p> }
          {image && <img src={image} className="w-full" alt="post-image"/>}
        </div>
         <div className="py-3 px-6 text-[#656066]  flex justify-between bg-white  rounded-sm text-sm">
          <div className="flex gap-2 items-center">{likesCount} likes </div>
          <div className="flex gap-2 items-center">{commentsCount} comments </div>
          <div className="flex gap-2 items-center">{sharesCount} shares </div>
        </div>
        <hr className="mx-auto w-[93%] border-t border-gray-200"/>
        <div className="py-4 px-6  flex justify-between bg-white  rounded-sm">
          <button onClick={()=>likePost()} className="font-bold cursor-pointer flex gap-2 items-center">Like 
            {isPostLiked?
            <>
             <AiFillLike className="text-2xl"/>
            </>:
            <>
             <AiOutlineLike className="text-xl"/>
            </>
            }
          </button>
          <Link to={`/postdetails/${postId}`}>
          <div className="font-bold cursor-pointer flex gap-2 items-center">Comment <FaCommentAlt/></div>
          </Link>
          <button className="font-bold cursor-pointer flex gap-2 items-center">Share <FaShare/></button>
        </div>
        <CommentCreation postId={postId} queryKey={isPostDetails ? ["getPostComments", postId]  : queryKey }/>

        {isPostDetails ?
        <>
        {commentsData?.data.data.comments &&
        commentsData.data.data.comments.map((comment: CommentType) => (
          <Comment  comment={comment} postId ={postId} commentId={comment?._id} queryKey={isPostDetails ? ["getPostComments", postId] : queryKey} key={comment._id} loginUserId={loginUserId} commentMakerId={comment.commentCreator._id}/>
        ))}
        </> : 
        <>
        {topComment &&
          <Comment comment={topComment} commentId={topComment?._id} postId ={postId} queryKey={isPostDetails ? ["getPostComments", postId] : queryKey} loginUserId={loginUserId} commentMakerId={topComment.commentCreator._id}/>
        }
        </>
        }
       
      </div>
    </>
  )
}
