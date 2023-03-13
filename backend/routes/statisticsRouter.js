const router = require("express").Router();
const statisticsController = require('../controllers/statisticsController');
const { authentication } = require("../middlewares/authenticationMiddleware");
const { checkAdmin } = require("../middlewares/authorizationMiddleware");

router.get('/count-user', authentication, checkAdmin, statisticsController.countUser);
router.get('/count-word', authentication, checkAdmin, statisticsController.countWord);
router.get('/count-listening', authentication, checkAdmin, statisticsController.countListening);
router.get('/count-quiz', authentication, checkAdmin, statisticsController.countQuiz);
router.get('/count-grammar', authentication, checkAdmin, statisticsController.countGrammar);
module.exports = router;
