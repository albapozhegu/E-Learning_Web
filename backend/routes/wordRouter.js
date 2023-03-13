const wordApi = require('express').Router();
const { Router } = require('express');
const wordController = require('../controllers/wordController');
const { authentication } = require('../middlewares/authenticationMiddleware');

wordApi.get('/get-all-word', authentication, wordController.getAllWords);
wordApi.post('/post-word',authentication, wordController.postContributeWord);
wordApi.put('/put-word/:id',authentication, wordController.putContributeWord);
wordApi.delete('/delete-word', authentication, wordController.deleteWord);
wordApi.get('/exist-word',authentication, wordController.getCheckWordExistence);
wordApi.get('/get-word-pack',authentication, wordController.getWordPack);
wordApi.get('/search-word',authentication, wordController.getSearchWord);
wordApi.get('/get-word-details',authentication, wordController.getWordDetails);
wordApi.get('/get-word-by-topic/:topic',authentication, wordController.getByTopic);
wordApi.get('/get-word-topics/:topic',authentication, wordController.getTopics);
wordApi.get('/get-word-topic-slide',authentication, wordController.getWordTopicSlide);
wordApi.get('/get-word-topic-gallery',authentication, wordController.getWordTopicGallery);
wordApi.get('/get-word-by-word',authentication, wordController.getWordByWord);


module.exports = wordApi;
