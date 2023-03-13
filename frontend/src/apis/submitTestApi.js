import axios from "axios";
const URL = `/api/submitTest`;

const submitTestApi = {
  postSubmit: (id, submit) => {
    return axios.post(`${URL}/post-submitTest/${id}`, { submit });
  },

  putAnswerSubmit: (id, body) => {
    return axios.put(`${URL}/put-answer-submitTest/${id}`, { ...body });
  },

  putSubmit: (id, part, answer) => {
    return axios.put(`${URL}/put-submitTest/${id}`, {
      Part: part,
      AnswerTests: answer,
    });
  },

  getSubmitById: (id) => {
    return axios.get(`${URL}/get-submitTest-by-id/${id}`);
  },

  getSubmitByTest: (id) => {
    return axios.get(`${URL}/get-submitTest-by-test/${id}`);
  },

  checkSubmitExisted: (id) => {
    return axios.get(`${URL}/check-submitTest/${id}`);
  },

  deleteSubmit: (id) => {
    return axios.delete(`${URL}/delete-submitTest/${id}`);
  },
};
export default submitTestApi;
