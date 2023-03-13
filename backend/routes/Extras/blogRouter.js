const router = require('express').Router();
const controller = require('../../controllers/Extras/blogController');
const { authentication, authRole } = require('../../middlewares/authenticationMiddleware');

router.get('/get-all-blog',authentication, controller.getAllBlog);
router.get('/get-blog-by-id',authentication, controller.getBlogById);
router.put('/put-blog/:id',authentication, controller.updateBlog)
router.post('/post-blog',authentication, controller.addBlog)
router.delete('/delete-blog/:id',authentication, controller.deleteBlog)
module.exports = router