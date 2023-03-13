const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AnswerModel = new Schema({
  Content: {
    type: String,
    required: true,
  },

  QuestionId: {
    type: Schema.Types.ObjectId,
    ref: 'question',
  },

  IsCorrect: {
    type: Boolean,
    default:false,
  },

  submitQuiz: [{ type: Schema.Types.ObjectId, ref: 'submitquiz' }]
});

module.exports = mongoose.model('Answer', AnswerModel);
