const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FileTestModel = new Schema({
  Content: {
    type: String,
    default: null
  },

  Part: {
    type: Number,
    required: true
  },

  Image: {
    type: String
  },

  Image2: {
    type: String
  },

  Image3: {
    type: String
  },

  Audio: {
    type: String
  },

  TestId: {
    type: Schema.Types.ObjectId,
    ref: 'test'
  },

  File: {
    type: Number
  },

});

module.exports = mongoose.model('fileTest', FileTestModel);
