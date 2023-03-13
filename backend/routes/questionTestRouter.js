const router = require('express').Router();
const questionTestController = require('../controllers/questionTestController');
const { authentication, authRole } = require('../middlewares/authenticationMiddleware');

//router.get('/get-all-questionTest', authentication, questionTestController.getByTestId);
router.get('/get-questionTest-by-id/:id',authentication, questionTestController.getById);
router.get('/get-questionTest-by-file/:id',authentication, questionTestController.getByFileTestId);
router.post('/post-questionTest/:id', authentication, questionTestController.postQuestion);
router.post('/post-many-questionTest/:id', authentication, questionTestController.postManyQuestion);

module.exports = router;
