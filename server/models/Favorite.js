const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const favoriteSchema = mongoose.Schema(
  {
    userFrom: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    movieId: {
      type: String,
    },
    movieTitle: {
      type: String,
    },
    movieRunTime: {
      type: String,
    },
    moviePost: {
      type: String,
    },
  },
  { timestamp: true },
);

const Favorite = mongoose.model('Favorite', favoriteSchema);

module.exports = { Favorite };
