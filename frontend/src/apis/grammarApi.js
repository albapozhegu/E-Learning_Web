import axios from "axios";
const URL = `/api/grammar`;

const grammarApi = {
  getGrammar: (id) => {
    return axios.get(`${URL}/get-grammar/${id}`)
  },

  getGrammarById: (id) => {
    return axios.get(`${URL}/get-grammar-by-id/${id}`)
  },

  getGrammarByLevel: (level, token) => {
    return axios.get(`${URL}/get-grammar-by-level/${level}`, {
      headers: {Authorization: token}
    })
  },

  getGrammarLevels: (token) => {
    return axios.get(`${URL}/get-grammar-levels`, {
      headers: {Authorization: token}
    })
  },

  getAllGrammar: (token) => {
    return axios.get(`${URL}/get-all-grammar`, {
      headers: {Authorization: token}
    })
  },

  postGrammar: (formData) => {
    return axios.post(`${URL}/post-grammar`, {...formData},
    {
      header: { "content-type": "multipart/form-data" },
    })
  },

  putGrammar: (id, formData) => {
    return axios.put(`${URL}/put-grammar/${id}`, { ...formData},
    {
      params: { id },
      header: { "content-type": "multipart/form-data" },
    });
  },

  deleteGrammar: (id) => {
    return axios.patch(`${URL}/delete-grammar/${id}`)
  },

  searchGrammar: (title) => {
    return axios.get(`${URL}/search-grammar`, {params: {title}})
  },
}

export default grammarApi;
