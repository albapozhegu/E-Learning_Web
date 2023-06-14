const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AnswerTestModel = new Schema({
  Sentence: {
    type: String,
    required: true,
  },

  Content: {
    type: String,
    default: null,
  },

  QuestionTestId: {
    type: Schema.Types.ObjectId,
    ref: 'questionTest',
  },

  IsCorrect: {
    type: Boolean,
    default:false,
  },

  IsListening: {
    type: Boolean,
    default : false,
  },

});

module.exports = mongoose.model('answerTest', AnswerTestModel);
