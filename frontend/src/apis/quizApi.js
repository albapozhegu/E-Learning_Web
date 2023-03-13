import axios from "axios";
const URL = `/api/quiz`;

const quizApi = {
  getQuiz: (id, token) => {
    return axios.get(`${URL}/get-quiz-by-id/${id}`, {
      headers: { Authorization: token },
    });
  },

  getQuizByListen: (id) => {
    return axios.get(`${URL}/get-quiz-by-listen/${id}`);
  },
  getAllQuiz: (token) => {
    return axios.get(`${URL}/get-all-quiz`, {
      headers: { Authorization: token },
    });
  },

  postQuizByListen: (id) => {
    return axios.post(`${URL}/post-quiz-by-listen/${id}`);
  },

  deleteQuizByListen: (id, token) => {
    return axios.delete(`${URL}/delete-quiz-by-listen/${id}`, {
      headers: { Authorization: token },
    });
  },

  deleteQuiz: (id, token) => {
    return axios.delete(`${URL}/delete-quiz-by-id/${id}`, {
      headers: { Authorization: token },
    });
  },

  getAllListenAndGrammar: () => {
    return axios.get(`${URL}/get-all-listen-grammar`);
  },
};

export default quizApi;
