 import React, { useContext, useState } from 'react'
import { FaBookmark, FaPen, FaRegBookmark, FaRegCommentAlt } from 'react-icons/fa'
import { GrLike } from 'react-icons/gr'
import { IoReload, IoShareSocialOutline } from 'react-icons/io5'
import dayjs from 'dayjs'
import RelativeTime from "dayjs/plugin/relativeTime"
import Comment from '../Comment/Comment'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { AiFillLike } from 'react-icons/ai'
import toast from 'react-hot-toast'
import {useNetworkState, useSetState} from "react-use"

import {Button, Dropdown, Kbd, Label, Modal} from "@heroui/react";

import { MdDelete } from "react-icons/md";
import { BsThreeDotsVertical } from 'react-icons/bs'
import { UserContext } from '../../Context/UserContext'
import { IoIosCloseCircle } from 'react-icons/io'
import { HiPhotograph } from 'react-icons/hi'
dayjs.extend(RelativeTime)






export default function CardPost({post}) {



  const {loggedId}=useContext(UserContext)
 const [isOpening, setisOpening] = useState(false)
    const [isUpLouded, setIsUpLouded] = useState(false)
 const [liked, setLiked] = useState(false)
const {online}=useNetworkState()

const [image, setimage] = useState("")
const [body, setbody] = useState("")




//  console.log(post);
const queryClient=useQueryClient()
// like && unLikePost
function likePost(){
  
  return axios.put(`https://route-posts.routemisr.com/posts/${post.id}/like`,{},{
    headers:{
      Authorization:`Bearer ${localStorage.getItem("token")}`
    }
  })
}

const {data ,isPending,mutate}=useMutation({
mutationFn:likePost,
onSuccess:(response)=>{
  setLiked(response.data.data.liked)
console.log(response.data)
queryClient.invalidateQueries({

  queryKey:["getAllposts"]
})

queryClient.invalidateQueries({
  queryKey:["getPostDetails"]
})
  
}
})


// book mark call api
function bookMark(){
   return axios.put(`https://route-posts.routemisr.com/posts/${post?.id}/bookmark`,{},
    {
      headers:{
    Authorization:`Bearer ${localStorage.getItem("token")}`
      }
    }
   )
}

const {data:bo1,isPending:bo2,mutate:bo3}=useMutation({
mutationFn:bookMark,
onSuccess:()=>{
queryClient.invalidateQueries({
  queryKey:["getAllposts"]
})
 toast.success(post.bookmarked?"Post un Saved ":"Post Saved ")
}

})
// console.log(`post.id${post.id}`);

// call api Delete
function deletePost(post){

  return axios.delete(`https://route-posts.routemisr.com/posts/${post?.id}`,{
    headers:{
      Authorization:`Bearer ${localStorage.getItem("token")}`
    }
  })
}
const userId=post?.user?._id


const {data:del1,mutate:del2,isPending:del3,error}=useMutation({
    
mutationFn:()=>deletePost(post), 
onError:()=>{console.log("error");
},
onSuccess:()=>{console.log("delete dataaaaaaa");

  queryClient.invalidateQueries({
    queryKey:["getAllposts"]
  })
}
})









function editePost(){
  setisOpening(true)
  setbody(post.body || "")
  setimage(null)
}

// call api : Edite Post

function edite(formData){
  return axios.put(`https://route-posts.routemisr.com/posts/${post?.id}`,formData,{
    headers:{
      Authorization:`Bearer ${localStorage.getItem("token")}`
    }
  })
}

 
function handelUpdate(){
 const formData=new FormData

if(body){
  formData.append("body",body)
}
if(image){
  formData.append("image",image)
}

edite2(formData)
}
const {data:edite1, mutate:edite2,isPaused:edite3}=useMutation({
  mutationFn:edite,
  onSuccess:()=>{console.log("jjdjdjjdjdjdjdjdjdj")
    queryClient.invalidateQueries({
      queryKey:["getAllposts"]
    })
    queryClient.invalidateQueries({
      queryKey:["getPostDetails"]
    })
    }
    ,onError:()=>{console.log("Eroorrrrrrrrr");
  }
})


  
  return (
    <>
{online?"":<div className='bg-slate-900/90 text-white flex items-center justify-center fixed text-5xl inset-0'>
  <h1>offline Please Check Your Connection.....</h1>
</div>}
     <div className="card bg-base-100  shadow-sm my-3 border-3 border-gray-100 w-full md:w-[60%]">
  <div className="card-body">
    <div className='flex items-center justify-between '>
       <div className='flex items-center gap-3 '> 
        <div>
            <img className='w-10 h-10 rounded-full' src={post.user.photo} alt="" />
        </div>
        <div>
            <h4>{post.user.name}</h4>
            <h5>{dayjs(post.createdAt).fromNow()}</h5>
        </div></div>
        <div>
          <Dropdown>
      <Button aria-label="Menu" variant="secondary">
       <BsThreeDotsVertical />
      </Button>
      <Dropdown.Popover>
        <Dropdown.Menu >
          <Dropdown.Item id="new-file" textValue="New file">
            {/* <SquarePlus className="size-4 shrink-0 text-muted" /> */}
            <Label>save post</Label>
            <Kbd className="ms-auto" slot="keyboard" variant="light">
             
              <Kbd.Content> <div className='text-xl cursor-pointer' onClick={()=>{bo3()}}>
            
          {post.bookmarked?<FaBookmark /> :<FaRegBookmark  />}
          
        </div></Kbd.Content>
            </Kbd>
          </Dropdown.Item>
         {userId===loggedId&&<>
          <Dropdown.Item onClick={()=>editePost()} id="open-file" textValue="Open file">
            {/* <FolderOpen className="size-4 shrink-0 text-muted" /> */}
            <Label>Edite post</Label>
            <Kbd className="ms-auto" slot="keyboard" variant="light">
             
              <Kbd.Content><FaPen className='text-xl'/></Kbd.Content>
            </Kbd>
          </Dropdown.Item>
         
          <Dropdown.Item id="delete-file" textValue="Delete file" variant="danger" onClick={()=>del2()}>
            {/* <TrashBin className="size-4 shrink-0 text-danger" /> */}
            <Label>Delete Post</Label>
            <Kbd className="ms-auto" slot="keyboard" variant="light">
              {/* <Kbd.Abbr keyValue="command" /> */}
              {/* <Kbd.Abbr keyValue="shift" /> */}
              <Kbd.Content><MdDelete className='text-2xl'/></Kbd.Content>
            </Kbd>
          </Dropdown.Item>
         </>}
        </Dropdown.Menu>
      </Dropdown.Popover>
    </Dropdown>
        </div>
       
    </div>
   
  </div>
 <Link to={`/postdetails/${post.id}`} >
  {post.body&&<h2 className="card-title">{post.body}</h2>}
 {post.image&& <figure>
    <img className='w-full'
      src={post.image}
      alt={post.body} />
  </figure>}
 
 </Link>
  <div className='flex justify-between  items-center '>





    <div onClick={()=>mutate()} className='hover:bg-gray-200 transition-all rounded-md p-2 cursor-pointer flex  items-center gap-2'> 
      {liked?<AiFillLike  className='text-2xl'/>: <GrLike />}
     
        <p>{post.likesCount}</p>
    </div >
       <div className='hover:bg-gray-200 transition-all rounded-md p-2 cursor-pointer flex  items-center gap-2'>
        <FaRegCommentAlt />
         <p>{post.commentsCount}</p>
        
    </div>
       <div className='hover:bg-gray-200 transition-all rounded-md p-2 cursor-pointer flex  items-center gap-2'>
        <IoShareSocialOutline />
       <p>{post.sharesCount}</p>
    </div>
  </div>


     <Modal className="cursor-pointer" isOpen={isOpening} onOpenChange={setisOpening}>
      
      <Modal.Backdrop>
        <Modal.Container>
          <Modal.Dialog className="sm:max-w-[360px]">
            <Modal.CloseTrigger />
            <Modal.Header>
              
              <Modal.Heading>Edite Your Post...</Modal.Heading>
            </Modal.Header>
            <Modal.Body>
                {/* textArea && img */}
             <textarea value={body}  onChange={(e)=>{setbody(e.target.value)}}  placeholder='Edite Post ' className='w-full p-4 bg-slate-100 rounded-2xl'>

             </textarea>
                <div className='relative'>

                      {isUpLouded&&<img   src={isUpLouded} alt="" />}
                     <IoIosCloseCircle  className="absolute top-2.5 right-2.5 text-2xl cursor-pointer"/>
                </div>
             
           
            </Modal.Body>
            <Modal.Footer>
                <div className='flex items-center gap-3 '>
                    <label htmlFor="file">
                <input value={image} onChange={(e)=>setimage(e.target.files[0])}  type="file" id='file' hidden />
                {/* <MdOutlineAddPhotoAlternate  /> */}
           <HiPhotograph className='text-4xl cursor-pointer'/>
             </label>
              <Button onClick={()=>{handelUpdate()}} slot="close">
              {edite3?<IoReload className='animate-spin'/>:"Updata post"}
              </Button>
                </div>
             
            </Modal.Footer>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  <div>
    {post.topComment &&<Comment comment={post.topComment}/>}
    
  </div>
</div> 

    </>
  )
}
