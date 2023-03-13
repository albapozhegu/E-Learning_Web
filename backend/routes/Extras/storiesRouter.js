const router = require('express').Router();
const controller = require('../../controllers/Extras/storiesController');
const { authentication, authRole } = require('../../middlewares/authenticationMiddleware');

router.get('/get-all-stories',authentication, controller.getStories);
//router.get('/get-stories-by-id',authentication, null);
router.put('/put-stories/:id',authentication, controller.updateStories)
router.post('/post-stories',authentication, controller.addStories)
router.delete('/delete-stories/:id',authentication, controller.deleteStories)
module.exports = router