import axios from "axios";
const URL = `/api/event`;
const eventApi ={
    getevent:()=>{
        return axios.get(`${URL}/get-all-event`)
    },
    updateevent:(id,date, duration, title, host, status)=>{
        return axios.put(`${URL}/put-event/${id}`,{date, duration, title, host, status})
    },
    deleteevent:(id)=>{
        return axios.delete(`${URL}/delete-event/${id}`)
    },
    createevent:(date, duration, title, host, status)=>{
        return axios.get(`${URL}/post-event`,{date, duration, title, host, status})
    }
}
export default eventApi