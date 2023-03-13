const router = require('express').Router();
const fileTestController = require('../controllers/fileTestController');
const { authentication, authRole } = require('../middlewares/authenticationMiddleware');

router.get('/get-fileTest-by-test/:id', authentication, fileTestController.getByTestId);
router.get('/get-fileTest-by-id/:id',authentication, fileTestController.getById);
router.get('/get-fileTest-by-part',authentication, fileTestController.getByTestIdAndPart);
router.post('/post-fileTest/:id', authentication, fileTestController.postFileTest);
router.get('/get-questions-of-part', authentication, fileTestController.getQuestionsOfPart);
router.get('/get-questions-of-file', authentication, fileTestController.getQuestionsOfFile);

module.exports = router;
