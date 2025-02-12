const mongoose = require('mongoose');

const SectionSchema = new mongoose.Schema({
  sectionNumber: {
    type: Number,
    required: true,
  },
  isCompleted: {
    type: Boolean,
    default: false,
  }
  // Add other section-related fields as needed
});

const LevelSchema = new mongoose.Schema({
  levelNumber: {
    type: Number,
    required: true,
  },
  isCompleted: {
    type: Boolean,
    default: false,
  },
  sections: [SectionSchema],
});

const UserLessonProgressSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    unique: true,
  },
  levels: [LevelSchema],
});

const UserLessonProgress = mongoose.model('UserLessonProgress', UserLessonProgressSchema);

module.exports = UserLessonProgress;
