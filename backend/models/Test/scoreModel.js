const mongoose = require('mongoose');
const Schema = mongoose.Schema;
//const QuestionTest = require('./test/questionTestModel.model');

const ScoreModel = new Schema({
  Sentences: {
    type: Number
  },

  Score: {
    type: Number
  }
});

module.exports = mongoose.model('score', ScoreModel);
