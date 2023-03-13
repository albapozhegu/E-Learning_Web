import axios from "axios";
const URL = `/api/job`;
const jobApi ={
    getjob:()=>{
        return axios.get(`${URL}/get-all-job`)
    },
    updatejob:(id, title, description,status,createdBy )=>{
        return axios.put(`${URL}/put-job/${id}`,{ title, description,status,createdBy })
    },
    deletejob:(id)=>{
        return axios.delete(`${URL}/delete-job/${id}`)
    },
    createjob:( title, content )=>{
        return axios.get(`${URL}/post-job`,{ title, description,status,createdBy })
    }
}
export default jobApi