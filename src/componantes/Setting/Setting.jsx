import { Button, Input } from '@heroui/react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import React from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { MdPassword } from 'react-icons/md'
import { Form } from 'react-router-dom'

export default function Setting() {

   

function ChangePassword(body){
    return axios.patch(`https://route-posts.routemisr.com/users/change-password`,body,{
        headers:{
          Authorization:`Bearer ${localStorage.getItem("token")}`  
        }
    })
}




const {register,handleSubmit,reset} =useForm({
    defaultValues:{
        password:"",
        newPassword:""
    }
})

const {mutate,isPending,data}=useMutation({
    mutationFn:ChangePassword,
    onSuccess:()=>{
        console.log("success");
        toast.success("password Changed Successfuly")
       
    }
    
    ,
    
})

function handelChangePassword(values){
console.log(values);
const formData=new FormData

formData.append("password",values.password)
formData.append("newPassword",values.newPassword)

mutate(values)
reset()
}




  return (
    <>
    <div className="  bg-gray-200 p-5 rounded-md">
        <h2 className='text-2xl text-center font-bold mb-2 text-sky-500'>Change Password</h2>
 <form className='w-[60%] mx-auto' onSubmit={handleSubmit(handelChangePassword)}>

 <Input required="Enter Your Password" {...(register("password"))} type='password' aria-label="Pass"  className="w-full my-2 p-3" placeholder="Enter your Password" />
 <Input required="Enter NewPassword" {...(register("newPassword"))} type='password' aria-label="Pass" className="w-full my-2 p-3" placeholder="Enter New password" />
         <Button type={'submit'}  onClick={()=>""} className={'w-full my-3 py-3 '} >Change Password</Button>

  </form>
    </div>
 
    </>
  )
}
