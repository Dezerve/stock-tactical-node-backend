// const mongoose = require("mongoose");
// const LessonSectionProgress = require("./LessonSectionProgress")

// const LessonProgressSchema = new mongoose.Schema(
//   {
//     currentLessonNum: {
//       type: Number,
//     },
//     currentLessonTitle: {
//       type: String,
//     },
//     currentLessonNumSections: {
//       type: Number,
//     },
//     sectionsProgress: {
//         type: [LessonSectionProgress.schema],
//     },
//   },
//   { timestamps: true }
// );

// LessonProgressSchema.virtual('CurrentReviewTopicIncompletedCards').get(function () {
//   return this.currentLessonNumCards - this.currentLessonNumCardsCompleted;
// });

// LessonProgressSchema.virtual('CurrentLessonCardsCompletionRate').get(function () {
//   return Math.floor(this.currentLessonNumCompletedCards / this.currentLessonNumCards);
// });

// module.exports = mongoose.model("LessonProgress", LessonProgressSchema);

const mongoose = require("mongoose");

const LessonProgressSchema = new mongoose.Schema(
  {
    lessonName: {
      type: String,
    },
    currentSection: {
      type: String,
    },
    currentActivity: {
      type: String,
    },
    currentCompletedActivities: {
      type: [String],
    },
    completedSections: {
      type: [String],
    },
    lessonStatus: {
      type: String,
      enum: ["completed", "inProgress", "incomplete"],
      default: "incomplete",
    },
  }
);

module.exports = mongoose.model("LessonProgress", LessonProgressSchema);
