const mongoose = require("mongoose");

const ComprehensionTopicProgressSchema = new mongoose.Schema(
  {
    comprehensionTopicName: {
      type: String,
    },
    comprehensionTopicNum: {
      type: Number,
    },
    comprehensionTopicNumCards: {
        type: Number,
    },
    comprehensionTopicNumCompletedCards: {
        type: Number,
    },
    comprehensionTopicStatus: {
      type: String,
      enum: ["completed", "inProgress", "incomplete"],
      default: "incomplete",
    },
  },
  { timestamps: true }
);

ComprehensionTopicProgressSchema.virtual('CurrentComprehensionTopicIncompletedCards').get(function () {
  return this.comprehensionTopicNumCards - this.comprehensionTopicNumCardsCompleted;
});

ComprehensionTopicProgressSchema.virtual('CurrentComprehensionTopicCardsCompletionRate').get(function () {
  return Math.floor(this.comprehensionTopicNumCompletedCards / this.comprehensionTopicNumCards);
});

module.exports = mongoose.model("ComprehensionTopicProgress", ComprehensionTopicProgressSchema);
