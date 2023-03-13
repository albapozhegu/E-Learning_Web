const router = require('express').Router();
const answerTestController = require('../controllers/answerTestController');
const { authentication, authRole } = require('../middlewares/authenticationMiddleware');

router.get('/get-answerTest-by-question/:id', authentication, answerTestController.getByQuestionTestId);
router.get('/get-answerTest-by-id/:id',authentication, answerTestController.getById);
router.post('/post-answerTest/:id', authentication, answerTestController.postAnswer);
router.post('/post-many-answerTest/:id', authentication, answerTestController.postManyAnswers);

module.exports = router;
