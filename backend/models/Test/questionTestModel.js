const mongoose = require('mongoose');
const Schema = mongoose.Schema;
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

});

module.exports = mongoose.model('QuestionTest', QuestionTestModel);
