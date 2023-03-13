import axios from "axios";
const URL = `/api/ipa`;

const ipaApi = {
  getIPA: (id) => {
    return axios.get(`${URL}/get-ipa-by-id/${id}`)
  },

  getIPARelative: (type, phonetic) => {
    return axios.get(`${URL}/get-ipa-relative`, { params: { type, phonetic } })
  },

  getIPAByType: (type) => {
    return axios.get(`${URL}/get-ipa-by-type/${type}`)
  },


  postIPA: (formData, token) => {
    return axios.post(`${URL}/post-ipa`, formData, {
      headers: {Authorization: token}
    })
  },

}

export default ipaApi;
