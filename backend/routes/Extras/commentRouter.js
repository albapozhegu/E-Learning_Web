const router = require('express').Router();
const controller = require('../../controllers/Extras/commentsController');
const { authentication, authRole } = require('../../middlewares/authenticationMiddleware');

router.get('/get-all-comment',authentication, controller.getComment);
router.get('/get-comment-by-id',authentication,controller.getCommentByForumId);
router.put('/put-comment/:id',authentication, controller.updateComment)
router.post('/post-comment',authentication, controller.addComment)
router.delete('/delete-comment/:id',authentication, controller.deleteComment)
module.exports = router