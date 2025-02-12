const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const UserProgress = require("./UserProgress");
const UserFavorites = require("./UserFavorites");

const AppConstantsSchema = new mongoose.Schema(
  {
    numLessons: {
      tytpe: Number,
    },
    numLearningTopcis: {
      tytpe: Number,
    },
    numReviewTopcis: {
      tytpe: Number,
    },
    numComprehensionTopics: {
      type: Number,
    },
    gameTypes: {
      type: [String],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("AppConstants", AppConstantsSchema);
