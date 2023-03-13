import axios from 'axios';
const URL = `/api/test`;

const testApi = {
  getAllTest: () => {
    return axios.get(`${URL}/get-all-test`)
  },
  getTestById: (id) => {
    return axios.get(`${URL}/get-test-by-id/${id}`)
  }
}
export default testApi;
