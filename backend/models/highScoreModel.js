const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const highscoreSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  accountId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'users',
  },
  coin: Number,
});

const HighscoreModel = mongoose.model(
  'highscore',
  highscoreSchema,
  'highscores',
);

module.exports = HighscoreModel;
