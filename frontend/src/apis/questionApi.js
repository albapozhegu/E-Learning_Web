import axios from "axios";
const URL = `/api/question`;

const questionApi = {
  getQuestion: (id) => {
    return axios.get(`${URL}/get-question-by-id/${id}`)
  },

  getQuestionByQuiz: (id, token) => {
    return axios.get(`${URL}/get-question-by-quiz/${id}`)
  },

  postQuestion: (id, question) => {
    return axios.post(`${URL}/post-question-by-quiz/${id}`, {...question})
  },

  putQuestion: (id, question) => {
    return axios.put(`${URL}/put-question/${id}`, {...question})
  },

  deleteQuestionByQuiz: (id, token) => {
    return axios.delete(`${URL}/delete-question-by-quiz/${id}`,{
      headers: {Authorization: token}
    })
  },

  deleteQuestion: (id) => {
    return axios.delete(`${URL}/delete-question-by-id/${id}`)
  },
}

export default questionApi;
