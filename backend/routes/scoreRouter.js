const router = require('express').Router();
const scoreController = require('../controllers/scoreController');
const { authentication, authRole } = require('../middlewares/authenticationMiddleware');

router.post('/post-score-listen', authentication, scoreController.postScoreListen);
router.post('/post-score-read', authentication, scoreController.postScoreRead);

module.exports = router;
