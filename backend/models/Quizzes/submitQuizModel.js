const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SubmitQuizModel = new Schema({
  Core: {
    type: Number,
    default: 0,
  },

  Comment: {
    type: String,
    maxlength: 200,
  },

  StartTime: {
    type: Date,
  },

  FinishTime: {
    type: Date,
  },

  IsFinish: {
    type: Date,
  },

  QuizId: {
    type: Schema.Types.ObjectId,
    ref: 'quiz',
    required: true,
  },

  UserId: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },

 Answer: [{ type: Schema.Types.Map}]
});

module.exports = mongoose.model('submitquiz', SubmitQuizModel);
