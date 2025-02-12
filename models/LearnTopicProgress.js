const mongoose = require("mongoose");

const LearnTopicProgressSchema = new mongoose.Schema(
  {
    learnTopicName: {
      type: String,
    },
    learnTopicNum: {
      type: Number,
    },
    learnTopicNumCards: {
      type: Number,
    },
    learnTopicNumCompletedCards: {
      type: Number,
    },
    learnTopicStatus: {
      type: String,
      enum: ["completed", "inProgress", "incomplete"],
      default: "incomplete",
    },
  },
  { timestamps: true }
);

LearnTopicProgressSchema.virtual("CurrentReviewTopicIncompletedCards").get(
  function () {
    return this.learnTopicNumCards - this.learnTopicNumCardsCompleted;
  }
);

LearnTopicProgressSchema.virtual("CurrentLearnTopicCardsCompletionRate").get(
  function () {
    return Math.floor(
      this.learnTopicNumCompletedCards / this.learnTopicNumCards
    );
  }
);

module.exports = mongoose.model("LearnTopicProgress", LearnTopicProgressSchema);
