const router = require('express').Router();
const controller = require('../../controllers/Extras/podcastController');
const { authentication, authRole } = require('../../middlewares/authenticationMiddleware');

router.get('/get-all-podcast',authentication, controller.getPodcast);
//router.get('/get-podcast-by-id',authentication, null);
router.put('/put-podcast/:id',authentication, controller.updatePodcast)
router.post('/post-podcast',authentication, controller.addPodcast)
router.delete('/delete-podcast/:id',authentication, controller.deletePodcast)
module.exports = router