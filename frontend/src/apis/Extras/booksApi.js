import axios from "axios";
const URL = `/api/books`;
const bookApi ={
    getbook:()=>{
        return axios.get(`${URL}/get-all-book`)
    },
    getbookbyid:(id)=>{
        return axios.get(`${URL}/get-book-by-id/${id}`)
    },
    updatebook:(id,data)=>{
        return axios.put(`${URL}/put-book/${id}`,data)
    },
    deletebook:(id)=>{
        return axios.delete(`${URL}/delete-book/${id}`)
    },
    createbook:(data)=>{
        return axios.post(`${URL}/post-book`,data)
    },
    updatecover:(id,data)=>{
         return axios.put(`${URL}/put-book-cover/${id}`,data)
    }
}
export default bookApi  
