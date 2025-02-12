const mongoose = require('mongoose');

const UserFavoritesSchema = new mongoose.Schema(
  {
    word: {
      type: String,
    },
    category: {
      type: String,
    },
  }
);

module.exports = mongoose.model('UserFavorites', UserFavoritesSchema);
