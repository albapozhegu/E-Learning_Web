import axios from "axios";
const URL = `/api/announcements`;
const announcementsApi ={
    getAnnouncements:()=>{
        return axios.get(`${URL}/get-all-announcement`)
    },
    updateAnnouncement:(id,title,content)=>{
        return axios.put(`${URL}/put-announcement/${id}`,{title,content})
    },
    deleteAnnouncement:(id)=>{
        return axios.delete(`${URL}/delete-announcement/${id}`)
    },
    createAnnouncement:(title,content)=>{
        return axios.get(`${URL}/post-announcement`,{title,content})
    }
}
export default announcementsApi