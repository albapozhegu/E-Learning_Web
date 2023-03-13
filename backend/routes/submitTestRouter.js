const router = require('express').Router();
const submitTestController = require('../controllers/submitTestController');
const { authentication, authRole } = require('../middlewares/authenticationMiddleware');

router.get('/get-submitTest-by-test/:id', authentication, submitTestController.getByTestId);
router.get('/get-submitTest-by-id/:id',authentication, submitTestController.getById);
router.post('/post-submitTest/:id', authentication, submitTestController.postSubmitTest);
router.put('/put-submitTest/:id', authentication, submitTestController.putSubmitTest);
router.put('/put-answer-submitTest/:id', authentication, submitTestController.putAnswerSubmitTest);
router.get('/check-submitTest/:id', authentication, submitTestController.checkSubmitExist);
router.delete('/delete-submitTest/:id', authentication, submitTestController.deleteById);

module.exports = router;
