const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const GrammarModel = new Schema({
  Title: {
    type: String,
    required: true,
  },

  Content: {
    type: String,
    required: true,
  },

  Video: {
    type: String,
    trim: true,
    default: null,
  },

  Audio: {
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

  Level: {
    type: String,
    enum: ["4", "1", "2", "3"],
    default: "0",
  },

  Items: [{ type: Schema.Types.Map }],
  isLocked: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model("Grammar", GrammarModel);
