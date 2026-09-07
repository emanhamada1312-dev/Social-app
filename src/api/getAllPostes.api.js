import axios from "axios"




export const allPosts = () => {
  const token = localStorage.getItem("token");

  return axios.get("https://route-posts.routemisr.com/posts", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};