import axios from "axios";
const URL = `/api/faq`;
const faqApi ={
    getfaq:()=>{
        return axios.get(`${URL}/get-all-faq`)
    },
    updatefaq:(id, question,answer)=>{
        return axios.put(`${URL}/put-faq/${id}`,{ question,answer})
    },
    deletefaq:(id)=>{
        return axios.delete(`${URL}/delete-faq/${id}`)
    },
    createfaq:( question,answer)=>{
        return axios.get(`${URL}/post-faq`,{ question,answer})
    }
}
export default faqApi