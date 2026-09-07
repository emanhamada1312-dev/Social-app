 import React, { useEffect, useState } from 'react'
import { allPosts } from '../../api/getAllPostes.api'
import CardPost from '../CardPost/CardPost'
import { RotatingLines } from 'react-loader-spinner'
import Loader from '../Loader/Loader'
import { useQuery } from "@tanstack/react-query";
import CreatePost from '../CreatePost/CreatePost'
 export default function Home() {

   const getAllposts=async()=>{
        await allPosts()
}
const {data ,isLoading ,isError ,error ,isFetching}=useQuery({
  queryKey:["getAllposts"]
  ,queryFn:allPosts
  ,select:(data)=>data?.data?.data?.posts
})
if(isLoading){
  return <Loader/>
}
 if(isError){
   return <div role="alert" className="alert alert-error flex items-center justify-center text-white">
  <span >{error.message}</span>
</div>
 }  
   return (
     <>
     <CreatePost/>



     <div className="container  m-auto">
{/* {posts.map((post)=>} */}
<div className=' w-[85%] m-auto flex flex-col items-center'>
{ 

data?.map((post)=><CardPost key={post.id} post={post} />)}
</div>

     </div>
      
     </>
   )
 }
 