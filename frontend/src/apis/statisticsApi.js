import axios from "axios";
const URL = `/api/statistics`;
const statisticsApi = {
  countUser: () => {
    return axios.get(`${URL}/count-user`);
  },
  countWord: () => {
    return axios.get(`${URL}/count-word`);
  },
  countListening: () => {
    return axios.get(`${URL}/count-listening`);
  },
  countQuiz: () => {
    return axios.get(`${URL}/count-quiz`);
  },
  countGrammar: () => {
    return axios.get(`${URL}/count-grammar`);
  },
};

export default statisticsApi;
