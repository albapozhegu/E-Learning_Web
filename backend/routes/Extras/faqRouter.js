const router = require('express').Router();
const controller = require('../../controllers/Extras/faqController');
const { authentication, authRole } = require('../../middlewares/authenticationMiddleware');

router.get('/get-all-faq',authentication, controller.getFAQ);
//router.get('/get-faq-by-id',authentication, null);
router.put('/put-faq/:id',authentication, controller.updateFAQ)
router.post('/post-faq',authentication, controller.addFAQ)
router.delete('/delete-faq/:id',authentication, controller.deleteFAQ)
module.exports = router