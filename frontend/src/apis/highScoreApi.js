import axios from "axios";
const URL = '/api/highscore';

const highscoreApi = {
  putUpdateHighscore(name = '', score = 0) {
    return axios.put(`${URL}/update`, { name, score });
  },

  postScore(name = '', coin = 0) {
    return axios.post(`${URL}/post`, { name, coin });
  },

  getLeaderboard(name = '') {
    return axios.get(`${URL}/leaderboard`, { params: { name } });
  },
};

export default highscoreApi;
