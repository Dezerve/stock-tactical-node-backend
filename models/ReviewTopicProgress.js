const mongoose = require("mongoose");

const ReviewTopicProgressSchema = new mongoose.Schema(
  {
    reviewTopicName: {
      type: String,
    },
    reviewTopicNum: {
      type: Number,
    },
    reviewTopicNumCards: {
        type: Number,
    },
    reviewTopicNumCompletedCards: {
        type: Number,
    },
    reviewTopicStatus: {
      type: String,
      enum: ["completed", "inProgress", "incomplete"],
      default: "incomplete",
    },
  },
  { timestamps: true }
);

ReviewTopicProgressSchema.virtual('CurrentReviewTopicIncompletedCards').get(function () {
  return this.reviewTopicNumCards - this.reviewTopicNumCardsCompleted;
});

ReviewTopicProgressSchema.virtual('CurrentReviewTopicCardsCompletionRate').get(function () {
  return Math.floor(this.reviewTopicNumCompletedCards / this.reviewTopicNumCards);
});

module.exports = mongoose.model("ReviewTopicProgress", ReviewTopicProgressSchema);
