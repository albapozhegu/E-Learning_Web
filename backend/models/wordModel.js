const mongoose = require('mongoose');
const { NUM_OF_SPECIALTY, NUM_OF_TOPICS } = require('../constants');
const Schema = mongoose.Schema;

const WordModel = new Schema({
  word: {
    type: String,
    required: true,
    trim: true,
    maxLength: 50,
  },

  mean: {
    type: String,
    required: true,
    trim: true,
    maxLength: 100,
  },

  type: {
    type: String,
    required: true,
    enum: ['', 'n', 'adj', 'adv', 'v', 'con', 'pre', 'pro', 'det'],
    default: '',
  },

  level: {
    type: String,
    required: true,
    enum: ['0', 'A1', 'A2', 'B1', 'B2', 'C1', 'C2'],
    default: '0',
  },

  phonetic: {
    type: String,
    trim: true,
    maxLength: 50,
    default: '',
  },

  examples: [
    {
      type: String,
      maxLength: 250,
    }
  ],
  

  picture: {
    type: String,
    trim: true,
    default: "https://res.cloudinary.com/phongvn2611/image/upload/v1638368033/english/word/default-image_fbmbtn.png",
  },

  specialty: {
    type: String,
    enum: Array.from({ length: NUM_OF_SPECIALTY }, (_, key) => key.toString()),
    default: '0',
  },

  topics: [
    {
      type: String,
      enum: Array.from({ length: NUM_OF_TOPICS }, (_, key) => key.toString()),
    },
  ],

  synonyms: [{ type: String, maxLength: 50 }],

  antonyms: [{ type: String, maxLength: 50 }],

  note: {
    type: String,
    trim: true,
    maxLength: 150,
  },

  // audioSrc: {
  //   type: String,
  //   default: null,
  // },

  isChecked: {
    type: Boolean,
    default: false,
  },
  isLocked: {
    type: Number,
    default: 0,
  }
});

module.exports = mongoose.model('Word', WordModel);
