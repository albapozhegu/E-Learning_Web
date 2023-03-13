const router = require('express').Router();
const controller = require('../../controllers/Extras/jobsController');
const { authentication, authRole } = require('../../middlewares/authenticationMiddleware');

router.get('/get-all-job',authentication, controller.getJob);
router.get('/get-job-by-id',authentication, controller.getJobById);
router.put('/put-job/:id',authentication, controller.updateJob)
router.post('/post-job',authentication, controller.addJob)
router.delete('/delete-job/:id',authentication, controller.deleteJob)
module.exports = router