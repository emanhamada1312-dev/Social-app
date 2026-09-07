import React from 'react'

// import {Globe} from "@gravity-ui/icons";
import {InputGroup, Label, TextField} from "@heroui/react";
import { MdSend } from 'react-icons/md';
import { FaImage, FaSpinner } from 'react-icons/fa';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
export default function CreateComment({id}) {


const queryClient=useQueryClient()
 

let form=useForm({
    defaultValues:{
       content:"",
    image:"" 
    }
})

const {register,handleSubmit,reset}=form

   //  createcomment
    function createComment(formData){
      return axios.post(`https://route-posts.routemisr.com/posts/${id}/comments`,formData,{
        headers:{
            Authorization:`Bearer ${localStorage.getItem("token")}`
        }
      })  
    }


const {mutate,isPending,isError,isSuccess}=useMutation({
    
    mutationFn:createComment,
   onSuccess:()=>{
    reset()
    queryClient.invalidateQueries({
        queryKey:["getPostDetails"]
    })
    // getAllComments بنكيش ----اسم الفايل مش الفانكشن
     queryClient.invalidateQueries({
        queryKey:["getAllComments"]
    })
   }
})



function handelCreateComment(values){
    const formData= new FormData()
console.log(values);

if(!values.content && !values.image) return

if(values.content){
    formData.append("content",values.content)
}
if(values.image){
    formData.append("image",values.image[0])
    
}
mutate(formData)
}







  return (
    <>
 <form onSubmit={handleSubmit(handelCreateComment)}>
         <TextField className="w-full "   name="website">
      
      <InputGroup >
       
        <InputGroup.Input  {...(register("content"))} className="w-full p-2 " placeholder='Write a comment' />
        
         <InputGroup.Prefix>
          <button type='submit' className={isPending?"cursor-not-allowed":""}  disabled={isPending}>{isPending?<FaSpinner className='animate-spin' />:<MdSend  className="size-6 text-blue-600 cursor-pointer" />}</button>
        </InputGroup.Prefix>
      </InputGroup>
    </TextField>
    <label htmlFor="file" className='mt-3 w-full cursor-pointer bg-gray-400  flex items-center justify-center p-3 rounded-md ' ><FaImage className='size-5 '/></label>
    <input {...(register("image"))} type="file" hidden  id='file'/>
 </form>
    </>
  )
}
