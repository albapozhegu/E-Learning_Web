const router = require('express').Router();
const controller = require('../../controllers/Extras/eventsController');
const { authentication, authRole } = require('../../middlewares/authenticationMiddleware');

router.get('/get-all-event',authentication, controller.getAllEvents);
router.get('/get-event-by-id',authentication,controller.getEventById);
router.put('/put-event/:id',authentication, controller.updateEvent)
router.post('/post-event',authentication, controller.addEvent)
router.delete('/delete-event/:id',authentication, controller.deleteEvent)
module.exports = router