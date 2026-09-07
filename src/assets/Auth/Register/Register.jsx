import React, { useContext, useEffect, useRef, useState } from 'react'
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




export default function Register() {
 

const [showpassword, setshowPassword] = useState(true)
const [isLoading, setIsLoading] = useState(false)

const navigate=useNavigate()

// validation by zod libirary
const schema=z.object({
  name:z.string().min(3,"name mast be at latest  3 charcters ").max(15,"name mast be at latest 15 character"),

  username:z.string().min(3,"name mast be at latest  3 charcters ").max(15,"name mast be at latest 15 character")
  ,email:z.string().email("invalid mail"),
dateOfBirth:z.string().regex(/^\d{4}-\d{2}-\d{2}$/,"Invalid Date").refine((date)=>{
const userDate=new Date(date);
const now=new Date();
now.setHours(0,0,0,0)

return userDate<now
}," Cant Enter Future Date")
,gender:z.enum(["male","female"]," choose male or female")
,password:z.string().regex(/^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[#?!@$%^&*-]).{8,}$/," Password must be at least 8 characters and contain uppercase, lowercase, number, and special character.")
,rePassword:z.string()
}).refine((object)=>object.password===object.rePassword ,{
  error:" must be password and repassword the same"
  ,path:["rePassword"]
}
)
// rhfبنجمع الداتا من خلال مكتبه 
let form =useForm({
  defaultValues:{
    name:"",
    username:"",
    email:"",
    dateOfBirth:"",
    gender:"",
    password:"",
    rePassword:""
  }
  ,
  resolver:zodResolver(schema)
  ,mode:"all"
})



// ---------------------------------





// call api

let {register,handleSubmit,formState ,watch}=form
const passwordValue=watch("password")
async function handelRegister(values){
// console.log(values);
if(isLoading){
  return;
}
try {
  setIsLoading(true);
  let {data}=await axios.post("https://route-posts.routemisr.com/users/signup",values)
  console.log(data);
  Swal.fire({
  title: "Good job!",
  text: data.message,
  icon: "success"
})
setTimeout(() => {
 navigate("/login") 
}, 3000);

  
} catch (error) {
  console.log(error.response.data.message);

   Swal.fire({
  title: "Error",
  text: error.response.data.message,
  icon: "error"
});
}finally{
  setIsLoading(false)
}

}



  return (
    <>
     <div className='bg-gray-100 py-4'>
      <div className='bg-white lg:w-1/2 m-auto text-center rounded-2xl p-3'>
       <h2 className='font-bold text-2xl text-sky-400'> Register</h2>
      
        <form onSubmit={handleSubmit(handelRegister)}>
          {/* name */}
         
          <Input {...register("name")}  type='text' aria-label="name" className="w-full my-2 p-3" placeholder="Enter your Name" />
            <Errormessage error={formState.errors.name} />
{/* username */}
          <Input {...register("username")}  type='username' aria-label="username" className="w-full my-2 p-3" placeholder="Enter your UserName" />
           <Errormessage error={formState.errors.username} />
          {/* email */}
          <Input {...register("email")}  type='email' aria-label="email" className="w-full my-2 p-3" placeholder="Enter your Email" />
    <Errormessage error={formState.errors.email} />
{/* dateOfBirth */}
          <Input  {...register("dateOfBirth")}  type='date' aria-label="dateOfBirth" className="w-full my-2 p-3" placeholder="Enter your dateOfBirth" />
            <Errormessage error={formState.errors.dateOfBirth} />
          {/* gender */}
         
           <select {...register("gender")} defaultValue="Choose Your type" className="select w-full bg-white  hover:bg-gray-100 transition-all rounded-2xl  my-3 py-2 ">
  <option disabled={true}>Choose Your type</option> 
  <option>male</option>
  <option>female</option>

         </select>
           <Errormessage error={formState.errors.gender} />
       {/* password */}
       <div className='relative'>
        {passwordValue&&<span className='absolute right-4 top-6 cursor-pointer' onClick={()=>{setshowPassword(!showpassword)}}>{showpassword?<FaEyeSlash/> :<FaEye/>} </span>}
          <Input {...register("password")}  type={showpassword?'password':"text"} aria-label="password" className="w-full my-2 p-3" placeholder="Enter your Password" />
        <Errormessage error={formState.errors.password} />
       </div>
      
         {/* repassword */}
          <Input {...register("rePassword")}  type='password' aria-label="repassword" className="w-full my-2 p-3" placeholder="Enter your rePassword" />
          <Errormessage error={formState.errors.rePassword} />
       {/* Submit */}
        <div >
         
         <Button type={'submit'}  className={'w-full mt-3 py-4 mb-3'} >{isLoading?<FaSpinner  className="animate-spin"/>:"Register"}</Button>
         <span > Have An Account ? <Link to="/login" className="text-sky-400"> Login Now </Link></span>
        </div>
        
        </form>
    
      </div>
     </div>
    </>
  )
}