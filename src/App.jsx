import { useContext, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './componantes/Layout/Layout'
import Home from './componantes/Home/Home'
import Profile from './componantes/Profile/Profile'
import Register from './assets/Auth/Register/Register'
import Notfound from './componantes/Notfound/Notfound'
import Login from './assets/Auth/login/Login'
import { CounterContextProvider } from './Context/CounterContext'
import UserContextProvider from './Context/UserContext'
import ProtectedRout from './componantes/ProtectedRout/ProtectedRout'
import AuthRout from './componantes/AuthRout/AuthRout'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import PostDetails from './componantes/PostDetails/PostDetails'
import { Toaster } from 'react-hot-toast'
import Setting from './componantes/Setting/Setting'

let query=new QueryClient()


let router=createBrowserRouter(
 [
    {path:"", element:<Layout/>,children:[
      {index:true,element:<AuthRout><Register/></AuthRout>},
    {path:"/home",element:<ProtectedRout><Home/></ProtectedRout>},
    {path:"/setting",element:<ProtectedRout><Setting/></ProtectedRout>},
     {path:"/login",element:<AuthRout><Login/></AuthRout>},
     {path:`/postdetails/:id`,element:<PostDetails/>},
    
     {path:"/profile",element:<ProtectedRout><Profile/></ProtectedRout>},
    {path:"*",element:<Notfound/>},
  ]}
 ] 
)




function App() {
  

  return (
    <>
    <QueryClientProvider client={query}>
    <UserContextProvider>
<CounterContextProvider>
     <RouterProvider router={router}></RouterProvider>
 <Toaster />
   </CounterContextProvider>
    </UserContextProvider>
   </QueryClientProvider>
     
    
    </>
  )
}

export default App
