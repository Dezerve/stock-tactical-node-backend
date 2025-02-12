const mongoose = require("mongoose");
const LessonProgress = require("./LessonProgress");
const LearnTopicProgress = require("./LearnTopicProgress");
const ReviewTopicProgress = require("./ReviewTopicProgress");
const ComprehensionTopicProgress = require("./ComprehensionTopicProgress");

const UserProgressSchema = new mongoose.Schema({
  // lessons
  // lessonName: {
  //   type: String,
  // },
  // currentSection: {
  //   type: String,
  // },
  // currentLessonNumSections: {
  //   type: Number,
  // },
  // currentActivity: {
  //   type: String,
  // },
  // currentCompletedActivities: {
  //   type: [String],
  // },
  // completedSections: {
  //   type: [String],
  // },
  // lessonStatus: {
  //   type: String,
  //   enum: ["completed", "inProgress", "incomplete"],
  //   default: "incomplete",
  // },

  lessonsProgress: [LessonProgress.schema],
  learningProgress: [LearnTopicProgress.schema],

  // learning topics
  currentLearnTopic: {
    type: String,
  },
  currentLearnTopicNum: {
    type: Number,
  },

  // reviewing topics
  currentReviewTopic: {
    type: String,
  },
  currentReviewTopicNum: {
    type: Number,
  },

  // comprehension topics
  currentComprehensionTopic: {
    type: String,
  },
  currentComprehensionTopicNum: {
    type: Number,
  },
});

// sections
UserProgressSchema.virtual("incompletedSections").get(function () {
  return this.currentLessonNumSections - this.completedSections;
});

UserProgressSchema.virtual("sectionCompletionRate").get(function () {
  return Math.floor(this.completedSections / this.currentLessonNumSections);
});

// comprehension topics
UserProgressSchema.virtual("CurrentComprehensionTopicIncompletedCards").get(
  function () {
    return (
      this.currentComprehensionTopicNumCards -
      this.currentComprehensionTopicNumCardsCompleted
    );
  }
);

UserProgressSchema.virtual("CurrentComprehensionTopicCardsCompletionRate").get(
  function () {
    return Math.floor(
      this.currentComprehensionTopicNumCompletedCards /
        this.currentComprehensionTopicNumCards
    );
  }
);

module.exports = mongoose.model("UserProgress", UserProgressSchema);
