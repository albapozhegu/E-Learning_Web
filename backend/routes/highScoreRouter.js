const highScoreApi = require('express').Router();
const highScoreController = require('../controllers/highScoreController');
const { authentication } = require("../middlewares/authenticationMiddleware");

highScoreApi.put('/update', authentication, highScoreController.putUpdateHighScore);

highScoreApi.get('/leaderboard',authentication, highScoreController.getLeaderboard);
highScoreApi.post('/post', authentication, highScoreController.postScore);

module.exports = highScoreApi;
