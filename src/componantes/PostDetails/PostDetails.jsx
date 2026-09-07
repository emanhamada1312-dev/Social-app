import { useQuery } from '@tanstack/react-query'
import dayjs from 'dayjs';
import React from 'react'
import { FaRegCommentAlt } from 'react-icons/fa';
import { GrLike } from 'react-icons/gr';
import { IoShareSocialOutline } from 'react-icons/io5';
import { useParams } from 'react-router-dom'
import relativeTime from 'dayjs/plugin/relativeTime'
import { getDetails } from '../../api/getPostDetails.api';
import Loader from '../Loader/Loader';
import Comment from '../Comment/Comment';
import { getComments } from '../../api/getAllComments.api';
import CreateComment from '../CreateComment/CreateComment';

dayjs.extend(relativeTime)
export default function PostDetails() {

const {id}=useParams()
// console.log(params);

// console.log(id);

const {data,isError,isLoading,error,isFetched}=useQuery({
    queryKey:["getPostDetails",id],
    queryFn:()=>getDetails({id}),
    select:(data)=>data?.data?.data?.post
})
// console.log(data);

// get all comments

const {data:comments ,isError:comments2,isLoading:comments3,error:comments4}=useQuery({
    queryKey:["getAllComments",id],
    queryFn:()=>getComments({id}),
    select:(comments)=>comments.data?.data?.comments
})
console.log(comments);



if(isLoading){
  return <Loader/>
}
  return (
    <>
         <div className="container  m-auto">

<div className=' w-[85%] m-auto flex flex-col items-center'>
       <div className="card bg-base-100  shadow-sm my-3 border-3 border-gray-100 w-full md:w-[60%]">
  <div className="card-body">
    <div className='flex items-center gap-3 '>
        <div>
            <img className='w-10 h-10 rounded-full' src={data?.user?.photo} alt={data?.body} />
        </div>
        <div>
            <h4>{data?.user?.name}</h4>
            <h5>{dayjs(data?.createdAt).fromNow()}</h5>
        </div>
       
    </div>
     {data?.body&&<h2 className="card-title">{data?.body}</h2>}
  </div>
{/* {`/postdetails/${data?.id}`}  */}
 
 {data?.image&& <figure>
    <img className='w-full'
      src={data?.image}
      alt={data?.body} />
  </figure>}
 

  <div className='flex justify-between  items-center '>
    <div className='hover:bg-gray-200 transition-all rounded-md p-2 cursor-pointer flex  items-center gap-2'>
        <GrLike />
        <p>{data?.likesCount}</p>
    </div >
       <div className='hover:bg-gray-200 transition-all rounded-md p-2 cursor-pointer flex  items-center gap-2'>
        <FaRegCommentAlt />
         <p>{data?.commentsCount}</p>
        
    </div>
       <div className='hover:bg-gray-200 transition-all rounded-md p-2 cursor-pointer flex  items-center gap-2'>
        <IoShareSocialOutline />
       <p>{data?.sharesCount}</p>
    </div>
  </div>
  <div>
    
   <div> <CreateComment id={data?.id}/></div>
    
    {comments?.map((comment)=><Comment key={data?._id} comment={comment}/>)}
    
  </div>
</div> 
</div></div>
    </>
  )
}
