
import axios from 'axios';
const URL = `/api/fileTest`;

const fileTestApi = {
  getAllQuestionsOfPart: (testId = '', part = 0) => {
    return axios.get(`${URL}/get-questions-of-part`, { params: { testId, part }})
  },

  getAllQuestionsOfFile: (testId = '', part = 0, file = 0) => {
    return axios.get(`${URL}/get-questions-of-file`, { params: { testId, part, file }})
  }
}
export default fileTestApi;
