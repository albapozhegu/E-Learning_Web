import axios from "axios";
const URL = `/api/blog`;
const blogApi ={
    getBlog:()=>{
        return axios.get(`${URL}/get-all-blog`)
    },
    updateBlog:(id,title,content,status)=>{
        return axios.put(`${URL}/put-blog/${id}`,{title,content,status})
    },
    deleteBlog:(id)=>{
        return axios.delete(`${URL}/delete-blog/${id}`)
    },
    createBlog:(title,content,status)=>{
        return axios.get(`${URL}/post-blog`,{title,content,status})
    }
}
export default blogApi