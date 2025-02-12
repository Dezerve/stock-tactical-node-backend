const mongoose = require('mongoose');

const pageSchema = new mongoose.Schema({
  pageUrl: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
  views: {
    type: Number,
    default: 1,
  },
});

// Define the schema for the analytics data
const CustomAnalyticsSchema = new mongoose.Schema({
  sessionId: {
    type: String,
    required: true,
  },
  pages: [pageSchema],
});

// Create the Analytics model based on the schema
const CustomAnalytics = mongoose.model('CustomAnalytics', CustomAnalyticsSchema);

module.exports = CustomAnalytics;
