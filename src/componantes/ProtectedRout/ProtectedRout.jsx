import React from 'react'
import { Navigate } from 'react-router-dom'

export default function ProtectedRout({children}) {
 if( localStorage.getItem("token")){
    // go to componant
     return  children
 }
 else{
    // go to login
    return <Navigate to="/login"/>
 }
}
