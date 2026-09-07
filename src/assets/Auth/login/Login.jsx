import React, { useEffect, useRef, useState } from 'react'
import {Input} from "@heroui/react";
import {Select, Label, Description, Header, ListBox, Separator} from "@heroui/react";
import {Button} from "@heroui/react";
import {useForm} from "react-hook-form"
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Alert } from '@heroui/react';
import { FaEyeSlash,FaEye, FaSpinner } from 'react-icons/fa';
import Errormessage from '../../../componantes/Errormessage/Errormessage';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext  } from "../../../Context/UserContext";
import { useContext } from 'react'
export default function Login() {
let {setuserToken}=useContext(UserContext)
const [showpassword, setshowPassword] = useState(true)
const [isLoading, setIsLoading] = useState(false)

const navigate=useNavigate()


// validation by zod libirary
const schema=z.object({

  email:z.string().email("invalid mail")

,password:z.string().regex(/^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[#?!@$%^&*-]).{8,}$/," Password must be at least 8 characters and contain uppercase, lowercase, number, and special character.")

})
// rhfبنجمع الداتا من خلال مكتبه 
let form =useForm({
  defaultValues:{
    email:"",
    password:""
  }
  ,
  resolver:zodResolver(schema)
  ,mode:"all"
})



// ---------------------------------







let {register,handleSubmit,formState ,watch}=form

const passwordValue=watch("password")
async function handelRegister(values){
// console.log(values);
if(isLoading){
  return;
}
try {
  setIsLoading(true);
  let {data}=await axios.post("https://route-posts.routemisr.com/users/signin",values)
  console.log(data?.data?.token);
  localStorage.setItem("token",data.data.token)
setuserToken(data?.data?.token)




  Swal.fire({
  title: "Good job!",
  text: data.message,
  icon: "success"
})
setTimeout(() => {
 navigate("/home") 
}, 3000);

  
} catch (error) {
  console.log(error.response?.data?.message);

   Swal.fire({
  title: "Error",
  text: error.response?.data?.message,
  icon: "error"
});
}finally{
  setIsLoading(false)
}

}



  return (
    <>
     <div className='bg-gray-100 py-4 '>
      <div className='bg-white lg:w-1/2 m-auto text-center rounded-2xl p-3'>
       <h2 className='font-bold text-2xl text-sky-400'> Login</h2>
      
        <form onSubmit={handleSubmit(handelRegister)}>
          
         
         
          
          {/* email */}
          <Input {...register("email")}  type='email' aria-label="email" className="w-full my-2 p-3" placeholder="Enter your Email" />
    <Errormessage error={formState.errors.email} />

         

           
       {/* password */}
       <div className='relative'>
        {passwordValue&&<span className='absolute right-4 top-6 cursor-pointer' onClick={()=>{setshowPassword(!showpassword)}}>{showpassword?<FaEyeSlash/> :<FaEye/>} </span>}
          <Input {...register("password")}  type={showpassword?'password':"text"} aria-label="password" className="w-full my-2 p-3" placeholder="Enter your Password" />
        <Errormessage error={formState.errors.password} />
       </div>
      
      <div>
        
         <Button type={'submit'}  className={'w-full my-3 py-3 '} >{isLoading?<FaSpinner  className="animate-spin"/>:"Login"}</Button>
         <span >Dont Have An Account ? <Link to="/" className="text-sky-400"> Register Now </Link></span> 
      </div>
        </form>
    
      </div>
     </div>
    </>
  )
}