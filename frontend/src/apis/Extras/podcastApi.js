import axios from "axios";
const URL = `/api/podcast`;
const podcastApi ={
    getpodcast:()=>{
        return axios.get(`${URL}/get-all-podcast`)
    },
    updatepodcast:(id,title, file, duration, authour )=>{
        return axios.put(`${URL}/put-podcast/${id}`,{ title, file, duration, authour })
    },
    deletepodcast:(id)=>{
        return axios.delete(`${URL}/delete-podcast/${id}`)
    },
    createpodcast:( title, file, duration, authour)=>{
        return axios.get(`${URL}/post-podcast`,{ title, file, duration, authour })
    }
}
export default podcastApi