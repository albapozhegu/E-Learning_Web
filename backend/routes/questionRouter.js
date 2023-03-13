const questionApi = require('express').Router();
const questionController = require('../controllers/questionController');
const { authentication, authRole } = require('../middlewares/authenticationMiddleware');

questionApi.get('/get-question-by-id/:id',authentication, questionController.getById);
questionApi.get('/get-question-by-quiz/:id',authentication, questionController.getByQuizId);
questionApi.post('/post-question-by-quiz/:id',authentication, questionController.postQuestion);
questionApi.put('/put-question/:id',authentication, questionController.putQuestion);
questionApi.delete('/delete-question-by-id/:id',authentication, questionController.deleteById);


module.exports = questionApi;
