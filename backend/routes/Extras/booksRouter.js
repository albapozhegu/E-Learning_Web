const router = require('express').Router();
const controller = require('../../controllers/Extras/booksController');
const { authentication, authRole } = require('../../middlewares/authenticationMiddleware');

router.get('/get-all-book',authentication, controller.getBooks);
//router.get('/get-book-by-id',authentication, null);
router.put('/put-book/:id',authentication, controller.updateBooks)
router.post('/post-book',authentication, controller.addBooks)
router.delete('/delete-book/:id',authentication, controller.deleteBooks)
module.exports = router