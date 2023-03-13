const router = require('express').Router();
const controller = require('../../controllers/Extras/announcementsController');
const { authentication, authRole } = require('../../middlewares/authenticationMiddleware');

router.get('/get-all-announcement',authentication, controller.getAnnouncement);
router.put('/put-announcement/:id',authentication, controller.updateAnnouncement)
router.post('/post-announcement',authentication, controller.addAnnouncement)
router.delete('/delete-announcement/:id',authentication, controller.deleteAnnouncement)
module.exports = router