const gameApi = require('express').Router();
const gameController = require('../controllers/gameController');
const { authentication } = require("../middlewares/authenticationMiddleware");

// ======== CORRECT WORD GAME ========
gameApi.get('/correct-word/pack',authentication, gameController.getWordPackCWG);

// ======== WORD MATCH GAME ========
gameApi.get('/word-match/pack',authentication, gameController.getWordPackWMG);

// ======== FAST GAME ========
gameApi.get('/fast-game/pack',authentication, gameController.getWordPackFS);

module.exports = gameApi;
