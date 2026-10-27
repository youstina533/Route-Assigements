import Post from '../../../Components/Posts/Post';
import axios from 'axios';
import { type PostType } from '../../../Types/Posts.type';
import LoadingSpinner from './../../../Components/Loading/LoadingSpinner';
import { useQuery } from '@tanstack/react-query';
import PostCreation from './../../../Components/PostCreation/PostCreation';
import {Helmet} from "react-helmet"


export default function HomePostsWithTanStack() {
  
    function getAllPosts(){
      return axios.get(`https://route-posts.routemisr.com/posts?sort=-createdAt`, {
        headers:{
          Authorization: `Bearer ${localStorage.getItem("userToken")}`,
        }
      })
    }

  const {data, isLoading, error, isError} = useQuery({
    queryKey: ["getAllPosts"],
    queryFn: getAllPosts
  })
  console.log(data);
  console.log(data?.data.data.posts);

  
    function getUserData(){
      return axios.get(`https://route-posts.routemisr.com/users/profile-data`, {
        headers:{
          Authorization: `Bearer ${localStorage.getItem("userToken")}`,
        }
      })
    }

  const {data:userData} = useQuery({
    queryKey: ["getUserData"],
    queryFn: getUserData
  })
  
  if(isLoading){
    return <LoadingSpinner/>
  }
  
  if(isError){
    return <h1 className="font-extrabold my-30 mx-auto">{error?.message}</h1>
  }
  
  return (
    <>
      <Helmet>
        <title>Home</title>
      </Helmet>
      <div className="my-29">
        <PostCreation userImage={userData?.data.data.user.photo} queryKey={["getAllPosts"]} />
        {data?.data.data.posts.map((post: PostType) => (
          <Post post={post} key={post.id} isPostDetails={false} queryKey={["getAllPosts"]} />
          )
        )}
      </div> 
    </>
  )
}
