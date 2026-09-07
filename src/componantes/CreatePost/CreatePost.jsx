import React, { useRef, useState } from 'react'
import {Avatar} from "@heroui/react";
import {Button, Modal} from "@heroui/react";
import { MdOutlineAddPhotoAlternate } from 'react-icons/md';
import { HiPhotograph } from 'react-icons/hi';
import { IoIosCloseCircle } from 'react-icons/io';
import axios from 'axios';
import { useMutation, useQueries, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';


export default function CreatePost() {
    const [isOpening, setisOpening] = useState(false)
    const [isUpLouded, setIsUpLouded] = useState(false)
const queryClint=useQueryClient()

    function handelImagePreview(e){
      
      setIsUpLouded(URL.createObjectURL(e.target.files[0]))
    }


    function handelRemoveImge(){
        setIsUpLouded(false)
    }

const textInput= useRef(null)
const imageInput=useRef(null)
// console.log(imageInpu);

// call api ==>creatPost
function creatPost(){
  return axios.post('https://route-posts.routemisr.com/posts',preperData(),{
    headers:{
      Authorization:`Bearer ${localStorage.getItem("token")}`
    }
  })
}



function preperData(){
  const formData=new FormData

  if(!textInput.current.value&& !imageInput.current.files[0]) return
  if(textInput.current.value){
formData.append('body',textInput.current.value)
  }
  if(imageInput.current.files[0]){
formData.append('image',imageInput.current.files[0])
  }
  
  return formData
}



const {data ,mutate ,isPending}=useMutation({
  mutationFn:creatPost,
  onSuccess:()=>{
    queryClint.invalidateQueries({
      queryKey:["getAllposts"]
    })
    queryClint.invalidateQueries({
      queryKey:["getUserPosts"]
    })
    
  toast.success("Post created successfully 🎉");
  setisOpening(false)
  setIsUpLouded(false)
  
  textInput.current.value=""
  imageInput.current.file[0]=""
  
  },
  onError:()=> {toast.success("Post failed to create ");} 

})

  return (
    <>
      <div className='container  m-auto w-125 bg-slate-50 p-4 rounded-2xl flex gap-2 items-center'>
        <Avatar>
        <Avatar.Image alt="John Doe" src="https://thumbs.dreamstime.com/b/generated-image-372601986.jpg" />
        <Avatar.Fallback>JD</Avatar.Fallback>
      </Avatar>

      <input onClick={()=>setisOpening(true)} type="text" className='w-full cursor-pointer p-4' placeholder='Creat Your Post' readOnly  />
      </div>
          
       <Modal className="cursor-pointer" isOpen={isOpening} onOpenChange={setisOpening}>
      
      <Modal.Backdrop>
        <Modal.Container>
          <Modal.Dialog className="sm:max-w-[360px]">
            <Modal.CloseTrigger />
            <Modal.Header>
              
              <Modal.Heading>Creat Your Post...</Modal.Heading>
            </Modal.Header>
            <Modal.Body>
                {/* textArea && img */}
             <textarea ref={textInput} placeholder='Creat Post ' className='w-full p-4 bg-slate-100 rounded-2xl'>

             </textarea>
                <div className='relative'>

                      {isUpLouded&&<img   src={isUpLouded} alt="" />}
                     <IoIosCloseCircle onClick={handelRemoveImge} className="absolute top-2.5 right-2.5 text-2xl cursor-pointer"/>
                </div>
             
           
            </Modal.Body>
            <Modal.Footer>
                <div className='flex items-center gap-3 '>
                    <label htmlFor="file">
                <input ref={imageInput} onChange={handelImagePreview} type="file" id='file' hidden />
                {/* <MdOutlineAddPhotoAlternate  /> */}
           <HiPhotograph className='text-4xl cursor-pointer'/>
             </label>
              <Button onClick={()=>{mutate()}} slot="close">
                Creat Post
              </Button>
                </div>
             
            </Modal.Footer>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
    </>
  )
}
