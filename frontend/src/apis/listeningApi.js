import axios from "axios";
const URL = `/api/listening`;

const listeningApi = {
  getListening: (id) => {
    return axios.get(`${URL}/get-listening/${id}`);
  },

  getListenByTopic: (topic, type) => {
    return axios.get(`${URL}/get-listen-by-topic`, {params: {topic, type}})
  },

  getListenById: (id) => {
    return axios.get(`${URL}/get-listen-by-id/${id}`)
  },

  getListenTopics: (topic, type) => {
    return axios.get(`${URL}/get-listen-topics`,{params: { topic, type}})
  },

  getAllListen: (type) => {
    return axios.get(`${URL}/get-all-listen`, {params: {type}})
  },

  searchListen: (name) => {
    return axios.get(`${URL}/search-listen`, {params: {name}})
  },

  postListen: (formData) => {
    return axios.post(`${URL}/post-listen`, {...formData},
    {
      header: { "content-type": "multipart/form-data" },
    })
  },

  putListen: (id, formData) => {
    return axios.put(`${URL}/put-listen/${id}`, { ...formData},
    {
      params: { id },
      header: { "content-type": "multipart/form-data" },
    });
  },

  deleteListen: (id) => {
    return axios.patch(`${URL}/delete-listen/${id}`)
  },
}

export default listeningApi;
