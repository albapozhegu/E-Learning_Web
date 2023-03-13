import axios from "axios";
const URL = `/api/book`;
const bookApi ={
    getbook:()=>{
        return axios.get(`${URL}/get-all-book`)
    },
    updatebook:(id,title,authour,thumbnail)=>{
        return axios.put(`${URL}/put-book/${id}`,{title,authour,thumbnail})
    },
    deletebook:(id)=>{
        return axios.delete(`${URL}/delete-book/${id}`)
    },
    createbook:(title,authour,thumbnail)=>{
        return axios.get(`${URL}/post-book`,{title,authour,thumbnail})
    }
}
export default bookApi