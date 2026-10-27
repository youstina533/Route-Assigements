import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import PostCreation from '../../../Components/PostCreation/PostCreation';
import {Helmet} from "react-helmet"
import { type UserType} from './../../../Types/User.type';
import { SlCalender } from "react-icons/sl";
import { MdAlternateEmail } from "react-icons/md";
import { FaTransgender } from "react-icons/fa";
import Post from './../../../Components/Posts/Post';
import { type PostType } from './../../../Types/Posts.type';
import { useState } from 'react';
import ChangePassword from './../../../Components/ChangePassword/ChangePassword';



export default function ProfileContent() {
 
    function getUserData(){
      return axios.get(`https://route-posts.routemisr.com/users/profile-data`, {
        headers:{
          Authorization: `Bearer ${localStorage.getItem("userToken")}`,
        }
      })
    }

  const {data, isLoading:MyProfileLoading, isError:MyProfileError} = useQuery({
    queryKey: ["getUserData"],
    queryFn: getUserData
  })

  const user:UserType = data?.data.data.user;

  function getMyPosts(){
    return axios.get(`https://route-posts.routemisr.com/users/${user._id}/posts`,{
        headers:{
          Authorization: `Bearer ${localStorage.getItem("userToken")}`,
        }
      })
  }

  const {data:MyPostsData} = useQuery({
    queryKey:["getMyPosts"],
    queryFn: getMyPosts,
    enabled: !MyProfileLoading && !MyProfileError && !!data,
  })

  const [isChangePasswordModelOpen, setisChangePasswordModelOpen] = useState(false);

  function showChangePawwsordPopUp(){
    setisChangePasswordModelOpen(true);  
  }

  return (
    <>
      <Helmet>
          <title>Profile</title>
      </Helmet>
     {user &&
     <>
      <div className="xl:w-[50%] mx-auto mt-20 bg-white shadow-xl rounded-lg text-gray-900">
        <div className="rounded-t-lg h-32 overflow-hidden">
        {user.cover &&   <img className="object-cover object-top w-full" src={user?.cover} alt={user?.name} />}
        </div>
        <div className="mx-auto w-32 h-32 relative -mt-16 border-4 border-white rounded-full overflow-hidden">
          <img className="object-cover object-center h-32" src={user?.photo} alt={user?.name} />
        </div>
        <div className="text-center mt-2">
          <h2 className="font-semibold">{user?.username}</h2>
          <p className="text-gray-500">{user?.followersCount} Followers</p>
        </div>
        <ul className="py-4 mt-2 text-gray-700 flex items-center justify-around">
          <li className="flex flex-col items-center justify-around">
            <SlCalender className="mb-4 text-2xl"/>
            <div>{user?.dateOfBirth.split("T")[0]}</div>
          </li>
          <li className="flex flex-col items-center justify-between">
            <MdAlternateEmail className="mb-4 text-2xl"/>
            <div>{user?.email}</div>
          </li>
          <li className="flex flex-col items-center justify-around">
            <FaTransgender className="mb-4 text-2xl"/>
            <div>{user?.gender}</div>
          </li>
        </ul>
        <div className="p-4 border-t mx-8 mt-2">
          <button onClick={()=>showChangePawwsordPopUp()} className="w-1/2 block mx-auto rounded-full bg-gray-900 hover:shadow-lg font-semibold text-white px-6 py-2">Change Password</button>
          { isChangePasswordModelOpen && <ChangePassword onClose={() =>setisChangePasswordModelOpen(false)}/>}
        </div>
      </div>

      <PostCreation userImage={data?.data.data.user.photo} queryKey={["getMyPosts"]}/>

      {MyPostsData?.data.data.posts.map((post:PostType)=>(
        <Post key={post._id} isPostDetails={false} post={post} queryKey={["getMyPosts"]}/> )) }

      </>}
    </>
  )
}
