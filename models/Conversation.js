const mongoose = require('mongoose');

const ConversationSchema = new mongoose.Schema(
  {
    convo_num: {
      type: String,
      trim: true,
    },
    eng_sent_sing: {
      type: String,
      trim: true,
    },
    eng_sent_pl: {
      type: String,
      trim: true,
    },
    eng_comments: {
      type: [String],
      trim: true,
    },
    kiny_sent_sing: {
      type: String,
      trim: true,
    },
    king_sent_pl: {
      type: String,
      trim: true,
    },
    eng_comments: {
      type: [String],
      trim: true,
    },
    categories: {
      type: [String],
      // required: [true, 'Please provide word category'],
    },
    eng_tags: {
      type: [String],
      // required: [true, 'Please provide word tag'],
    },
    kiny_tags: {
      type: [String],
      // required: [true, 'Please provide word tag'],
    },
    featured: {
      type: Boolean,
      default: false,
    },
    averageRating: {
      type: Number,
      default: 0,
    },
    numOfReviews: {
      type: Number,
      default: 0,
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      // required: true,
    },
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

ConversationSchema.pre('remove', async function (next) {
  await this.model('Review').deleteMany({ word: this._id });
});

module.exports = mongoose.model('Conversation', ConversationSchema);
