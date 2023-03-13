const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SubmitTestModel = new Schema({
   Score: {
    type: Number,
    default: 0,
  },

  ListenScore: {
    type: Number,
    default: 0,
  },

  ReadScore: {
    type: Number,
    default: 0,
  },

  ListenSentences: {
    type: Number,
    default: 0,
  },

  ReadSentences: {
    type: Number,
    default: 0,
  },

  Comment: {
    type: String   
  },

  StartTime: {
    type: Date
  },
  
  FinishTime: {
    type: Date
  },

  IsFinish: {
    type: Boolean,
    default: false,
  },

  TestId: {
    type: Schema.Types.ObjectId,
    ref: 'test',
  },

  UserId: {
    type: Schema.Types.ObjectId,
    ref: 'user',
  },

  AnswerTests1: [{
    type: Schema.Types.Map
  }],

  AnswerTests2: [{
    type: Schema.Types.Map
  }],

  AnswerTests3: [{
    type: Schema.Types.Map
  }],
  AnswerTests4: [{
    type: Schema.Types.Map
  }],
  
  AnswerTests5: [{
    type: Schema.Types.Map
  }],
  
  AnswerTests6: [{
    type: Schema.Types.Map
  }],
  
  AnswerTests7: [{
    type: Schema.Types.Map
  }],
  
});

module.exports = mongoose.model('submitTest', SubmitTestModel);
