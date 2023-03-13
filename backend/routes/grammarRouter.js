const router = require('express').Router();
const grammarController = require('../controllers/grammarController');
const { authentication, authRole } = require('../middlewares/authenticationMiddleware');

router.get('/get-all-grammar', authentication, grammarController.getAllGrammars);
router.get('/get-grammar-by-id/:id',authentication, grammarController.getById);
router.get('/get-grammar/:id',authentication, grammarController.getGrammar);
router.get('/get-grammar-by-level/:level',authentication, grammarController.getByLevel);
router.get('/get-grammar-levels',authentication, grammarController.getLevels);
router.post('/post-grammar',authentication, grammarController.postGrammar);
router.put('/put-grammar/:id',authentication, grammarController.putGrammar);
router.patch('/delete-grammar/:id',authentication, grammarController.deleteById);
router.get('/search-grammar',authentication, grammarController.getSearchGrammar);


module.exports = router;
