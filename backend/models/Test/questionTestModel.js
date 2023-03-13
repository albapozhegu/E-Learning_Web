const mongoose = require('mongoose');
const Schema = mongoose.Schema;
//const AnswerTest = require('./answerTestModel.model');


const QuestionTestModel = new Schema({
  Sentence: {
    type: Number,
    required: true,
  },
  
  Content: {
    type: String,
  },

  Image: {
    type: String
  },

  FileTestId: {
    type: Schema.Types.ObjectId,
    ref: 'fileTest',
  },

  // AnswerTests:[{
  //   type: Schema.Types.Map
  // }]
});

module.exports = mongoose.model('QuestionTest', QuestionTestModel);
