import { createContext, useEffect, useState } from "react";

import {jwtDecode} from "jwt-decode"

export let UserContext=createContext()


export default function UserContextProvider({children}){

const [userToken, setuserToken] = useState(localStorage.getItem("token"))
const [loggedId, setLoggedId] = useState(null)


useEffect(()=>{
if(localStorage.getItem("token")){
const {user}=jwtDecode(localStorage.getItem("token"))
console.log(user);
setLoggedId(user)
}


},[userToken])


    return <UserContext.Provider value={{setuserToken,loggedId}}>
        {/* app */}
        {children}
    </UserContext.Provider>
}