const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const GrammarItemsModel = new Schema({
  Content: {
    type: String,
    required: true,
  },

  Example: {
    type: String,
  },

  GrammarId: {
    type: Schema.Types.ObjectId,
    ref: 'Grammar',
    default: null,
  },
});

module.exports = mongoose.model('Grammar_Item', GrammarItemsModel);
