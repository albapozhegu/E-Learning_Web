const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Question = require('./question.model');

const TestModel = new Schema({
  Name: {
    type: String,
    maxlength:100,
    required: true,
  },

  Description: {
    type: String,
  },

  CreateDate: {
    type: Date,
    required: true,
    default: new Date(),
  },

  StartDate: {
    type: Date,
    required: true,
  },

  Duration: {
    type: Number,
    required: true,
  },

 Questions: {
    type: [Question],
  },

  Video: {
    type: String,
    trim: true,
    default: null,
  },

});

module.exports = mongoose.model('Test', TestModel);
