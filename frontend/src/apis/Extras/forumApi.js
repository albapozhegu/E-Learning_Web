import axios from "axios";
const URL = `/api/forum`;
const forumApi ={
    getforum:()=>{
        return axios.get(`${URL}/get-all-forum`)
    },
    updateforum:(id, title, content )=>{
        return axios.put(`${URL}/put-forum/${id}`,{title, content })
    },
    deleteforum:(id)=>{
        return axios.delete(`${URL}/delete-forum/${id}`)
    },
    createforum:( title, content )=>{
        return axios.get(`${URL}/post-forum`,{title, content })
    }
}
export default forumApi