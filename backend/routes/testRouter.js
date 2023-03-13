const router = require('express').Router();
const testController = require('../controllers/testController');
const { authentication, authRole } = require('../middlewares/authenticationMiddleware');

router.get('/get-all-test', authentication, testController.getAllTests);
router.get('/get-test-by-id/:id',authentication, testController.getById);
router.post('/post-test',authentication, testController.postTest);

module.exports = router;
