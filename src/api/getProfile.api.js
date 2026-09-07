import axios from "axios";




export  function profile(){
    return  axios.get("https://route-posts.routemisr.com/users/profile-data",{
        headers:{
            Authorization:`Bearer ${localStorage.getItem("token")}`
        }
    })
    
    
}