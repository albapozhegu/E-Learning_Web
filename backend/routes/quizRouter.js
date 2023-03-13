const quizApi = require('express').Router();
const { Router } = require('express');
const quizController = require('../controllers/quizController');
const { authentication, authRole } = require('../middlewares/authenticationMiddleware');

quizApi.get('/get-all-quiz',authentication, quizController.getAllQuizzes);
quizApi.get('/get-quiz-by-id/:id',authentication, quizController.getById);
quizApi.get('/get-quiz-by-listen/:id',authentication, quizController.getByListeningId);
quizApi.post('/post-quiz-by-listen/:id',authentication, quizController.postQuiz);
quizApi.delete('/delete-quiz-by-listen/:id',authentication, quizController.deleteByListenId);
quizApi.delete('/delete-quiz-by-id/:id',authentication, authentication, quizController.deleteById);
quizApi.get('/get-all-listen-grammar',authentication, quizController.getAllListenAndGrammar);

module.exports = quizApi;
