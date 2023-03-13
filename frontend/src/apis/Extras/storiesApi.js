import axios from "axios";
const URL = `/api/stories`;
const storiesApi ={
    getstories:()=>{
        return axios.get(`${URL}/get-all-stories`)
    },
    updatestories:(id, createdBy, content)=>{
        return axios.put(`${URL}/put-stories/${id}`,{ createdBy, content})
    },
    deletestories:(id)=>{
        return axios.delete(`${URL}/delete-stories/${id}`)
    },
    createstories:(  createdBy, content)=>{
        return axios.get(`${URL}/post-stories`,{ createdBy, content })
    }
}
export default storiesApi