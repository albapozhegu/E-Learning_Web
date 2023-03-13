const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const FileTest = require('./fileTestModel');

const TestModel = new Schema({
  Type: {
    type: String,
    required: true,
  },
  
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
    default: Date.now(),
  },

  Duration: {
    type: Number,
    default: 120,
  },
  
 // FileTests: [{type: Schema.Types.Map}]

});

module.exports = mongoose.model('Test', TestModel);
