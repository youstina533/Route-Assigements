import axios from "axios"
import { useQuery } from "@tanstack/react-query"
import LoadingSpinner from './../../../Components/Loading/LoadingSpinner';
import { useParams } from "react-router-dom";
import Post from './../../../Components/Posts/Post';
import {Helmet} from "react-helmet"

export default function PostDetailsWithTanStack() {
    const {id:postId} = useParams();

    function getPostDetails(){
      return axios.get(`https://route-posts.routemisr.com/posts/${postId}`,{
        headers:{
            Authorization : `Bearer ${localStorage.getItem("userToken")}`
        }
      })
    }

    const {data, isLoading, error, isError} = useQuery({
        queryKey: ["getPostDetails", postId],
        queryFn: getPostDetails
      })

    console.log(data?.data.data.post);
      
      if(isLoading){
        return <LoadingSpinner/>
      }
      
      if(isError){
        return <h1 className="font-extrabold my-30 mx-auto">{error?.message}</h1>
      }


    if (!postId) return null;

  return (
    <>
      <Helmet>
          <title>Post Details</title>
      </Helmet>
      <div className="mt-30">
       {data?.data.data.post && <Post post={data?.data.data.post} isPostDetails={true} queryKey={["getPostDetails", postId]}/>} 
      </div>
    </>
  )
}
