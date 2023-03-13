const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const ListeningModel = new Schema({
  CreateDate: {
    type: Date,
    required: true,
    default: Date.now,
  },

  Name: {
    type: String,
    required: true,
  },

  Topic: {
    type: String,
    required: true,
  },

  Description: {
    type: String,
    required: true,
  },

  Video: {
    type: String,
    trim: true,
    default: null,
  },

  Image: {
    type: String,
    trim: true,
    default: null,
  },

  Script: {
    type: String,
    default: null,
  },
  isLocked: {
    type: Number,
    default: 0,
  }
});

module.exports = mongoose.model('Listening', ListeningModel);
