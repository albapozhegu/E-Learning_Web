import axios from "axios";
const URL = `/api/comment`;
const commentApi ={
    getcomment:()=>{
        return axios.get(`${URL}/get-all-comment`)
    },
    updatecomment:(id,forumId, content, status)=>{
        return axios.put(`${URL}/put-comment/${id}`,{forumId, content, status})
    },
    deletecomment:(id)=>{
        return axios.delete(`${URL}/delete-comment/${id}`)
    },
    createcomment:(forumId, content, status)=>{
        return axios.get(`${URL}/post-comment`,{forumId, content, status})
    }
}
export default commentApi