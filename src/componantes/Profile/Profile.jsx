import React from "react";
import { Avatar, Button } from "@heroui/react";
import { FaCamera, FaPen, FaMapMarkerAlt } from "react-icons/fa";
import { HiUserGroup } from "react-icons/hi";
import { BsImages } from "react-icons/bs";
import CreatePost from "../CreatePost/CreatePost";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { profile } from "../../api/getProfile.api";
import axios from "axios";
import {  userPosts } from "../../api/userPost.api";
import CardPost from "../CardPost/CardPost";






export default function Profile() {


  const {data,isError,isLoading,error}=useQuery({
  queryKey:["getProfile"],
  queryFn:profile,
select:(data)=>(data?.data?.data?.user)

})
// console.log(data);




// user postes

const {data:post1,isLoading:post2,isError:post3}=useQuery({
  queryKey:["getUserPosts"],
  queryFn:()=>userPosts({data}),
  select:(post1)=>(post1?.data?.data?.posts)
})
console.log(post1);

console.log(post1);


  return (
    <>
       <>
       <div className="min-h-screen bg-gray-100 pb-10">

      {/* Profile Container */}
      <div className="max-w-5xl mx-auto">

        {/* Cover */}
        <div className="relative h-64 md:h-80 bg-gray-300 rounded-b-xl overflow-hidden">

          <img
            src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee"
            alt="cover"
            className="w-full h-full object-cover"
          />

          {/* Change Cover */}
          <button className="absolute bottom-4 right-4 bg-white px-4 py-2 rounded-lg flex items-center gap-2 text-sm font-medium shadow hover:bg-gray-100">
            <FaCamera />
            Edit Cover
          </button>

        </div>


        {/* Profile Info */}
        <div className="bg-white px-5 pb-5 rounded-b-xl">

          <div className="flex flex-col md:flex-row md:items-end gap-4">

            {/* Avatar */}
            <div className="-mt-16 relative w-fit">

              <Avatar className="w-32 h-32 border-4 border-white text-large">
                <Avatar.Image
            src="https://thumbs.dreamstime.com/b/generated-image-372601986.jpg"
                  alt="profile"
                />
                <Avatar.Fallback>EM</Avatar.Fallback>
              </Avatar>

              <button className="absolute bottom-2 right-1 bg-gray-200 rounded-full p-2 hover:bg-gray-300">
                <FaCamera />
              </button>

            </div>


            {/* Name */}
            <div className="flex-1 pt-2">

              <h1 className="text-2xl font-bold text-gray-900">
                
              </h1>

              <p className="text-gray-500">
                Frontend Developer
              </p>

              <div className="flex items-center gap-2 text-gray-500 mt-2">
                <HiUserGroup />
                <span>{data?.followersCount}</span>
              </div>

            </div>


            {/* Buttons */}
            <div className="flex gap-2">

              <Button
                className="bg-blue-600 text-white font-medium"
              >
                <FaPen />
                Edit Profile
              </Button>

              <Button
                className="bg-gray-200 text-gray-800 font-medium"
              >
                Add Story
              </Button>

            </div>

          </div>


          {/* Stats */}
          <div className="flex justify-center md:justify-start gap-8 border-t mt-5 pt-5">

            <div className="text-center">
              <p className="font-bold text-lg">125</p>
              <p className="text-gray-500 text-sm">Posts</p>
            </div>

            <div className="text-center">
              <p className="font-bold text-lg">{data?.followersCount}</p>
              <p className="text-gray-500 text-sm">Followers</p>
            </div>

            <div className="text-center">
              <p className="font-bold text-lg">{data?.followingCount}</p>
              <p className="text-gray-500 text-sm">Following</p>
            </div>

          </div>

        </div>


        {/* Main Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-5 px-3 md:px-0">

          {/* Left Side */}
          <div className="md:col-span-1">

            <div className="bg-white rounded-xl p-5">

              <h2 className="text-xl font-bold mb-4">
                Intro
              </h2>

              <p className="text-gray-600 text-center mb-5">
                Passionate Frontend Developer 🚀
                <br />
                Building beautiful and interactive web experiences.
              </p>


              <div className="flex items-center gap-3 text-gray-600 mb-4">
                <FaMapMarkerAlt />
                <span>Egypt</span>
              </div>


              <div className="flex items-center gap-3 text-gray-600 mb-4">
                <HiUserGroup />
                <span>{data?.followersCount}</span>
              </div>


              <button className="w-full bg-gray-100 py-2 rounded-lg font-medium hover:bg-gray-200">
                Edit Details
              </button>

            </div>


            {/* Photos */}
            <div className="bg-white rounded-xl p-5 mt-5">

              <div className="flex justify-between items-center mb-4">

                <h2 className="text-xl font-bold">
                  Photos
                </h2>

                <span className="text-blue-600 cursor-pointer">
                  See All
                </span>

              </div>


              <div className="grid grid-cols-3 gap-2">

                <img
                  src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3"
                  className="w-full h-24 object-cover rounded-lg"
                />

                <img
                  src="https://images.unsplash.com/photo-1498050108023-c5249f4df085"
                  className="w-full h-24 object-cover rounded-lg"
                />

                <img
                  src="https://images.unsplash.com/photo-1555066931-4365d14bab8c"
                  className="w-full h-24 object-cover rounded-lg"
                />

              </div>

            </div>

          </div>


          {/* Posts */}
          <div className="md:col-span-2">

            {/* Tabs */}
            <div className="bg-white rounded-xl mb-5">

              <div className="flex border-b">

                <button className="flex-1 py-4 font-semibold text-blue-600 border-b-2 border-blue-600">
                  Posts
                </button>

                <button className="flex-1 py-4 text-gray-500 hover:bg-gray-50">
                  About
                </button>

                <button className="flex-1 py-4 text-gray-500 hover:bg-gray-50 flex items-center justify-center gap-2">
                  <BsImages />
                  Photos
                </button>

              </div>

            </div>


            {/* Create Post */}
           <div className="my-3">
            <CreatePost />
           </div>


            {/* Post */}
        <div className=" flex flex-col items-center justify-center">
           {post1?.map((post)=>(<CardPost className="w-full"  key={post.id} post={post}/>)
              
           )  }
        </div>
          
            

          </div>

        </div>

      </div>

    </div>
     
     </>
    </>
  )
}
