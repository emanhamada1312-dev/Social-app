import axios from "axios"





export let getDetails=async({id})=>{
    // console.log(id);
    
    return await axios.get(`https://route-posts.routemisr.com/posts/${id}`,{
        headers:{
            Authorization : `Bearer ${localStorage.getItem("token")}`
        }
    })
    // console.log(`iddddddddddddddddddddd${id}`);
    
}