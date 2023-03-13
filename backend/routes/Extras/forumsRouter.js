const router = require('express').Router();
const controller = require('../../controllers/Extras/forumsController');
const { authentication, authRole } = require('../../middlewares/authenticationMiddleware');

router.get('/get-all-forum',authentication, controller.getForum);
//router.get('/get-forum-by-id',authentication, null );
router.put('/put-forum/:id',authentication, controller.updateForum)
router.post('/post-forum',authentication, controller.addForum)
router.delete('/delete-forum/:id',authentication, controller.deleteForum)
module.exports = router