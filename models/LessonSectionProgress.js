const mongoose = require("mongoose");

const LessonSectionTopicProgressSchema = new mongoose.Schema(
  {
    currentLessonSectionTopicNum: {
      type: Number,
    },
    currentLessonSectionTopicNumCards: {
        type: Number,
    },
    currentLessonSectionTopicNumCompletedCards: {
        type: Number,
    },
  },
  { timestamps: true }
);

LessonSectionTopicProgressSchema.virtual('CurrentReviewTopicIncompletedCards').get(function () {
  return this.currentLessonSectionTopicNumCards - this.currentLessonSectionTopicNumCardsCompleted;
});

LessonSectionTopicProgressSchema.virtual('CurrentLessonSectionTopicCardsCompletionRate').get(function () {
  return Math.floor(this.currentLessonSectionTopicNumCompletedCards / this.currentLessonSectionTopicNumCards);
});

module.exports = mongoose.model("LessonSectionTopicProgress", LessonSectionTopicProgressSchema);
