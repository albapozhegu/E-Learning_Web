const commonRouter = require('express').Router();
const commonController = require('../controllers/commonController');
commonRouter.get('/word-pack/total', commonController.getTotalWordPack);
commonRouter.get('/word-topic/total', commonController.getTotalWordPackTopic);
module.exports = commonRouter;
