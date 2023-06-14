const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const QuestionModel = new Schema({
  Content: {
    type: String,
    required: true,
  },

  QuizId: {
    type: Schema.Types.ObjectId,
    ref: 'quiz',
  },

  Answers:[{ type: Schema.Types.Map }]
});

module.exports = mongoose.model('Question', QuestionModel);
