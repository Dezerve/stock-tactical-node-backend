const mongoose = require('mongoose');

const WordSchema = new mongoose.Schema(
  {
    eng_word_sing: {
      type: String,
      trim: true,
      // required: [true, 'Please provide the singular form of the English word'],
    },
    eng_word_pl: {
      type: String,
      trim: true,
      // required: [true, 'Please provide the plural form of the English word'],
    },
    kiny_word_sing: {
      type: String,
      trim: true,
      // required: [true, 'Please provide the singular form of the Kinyarwanda word'],
    },
    kiny_word_pl: {
      type: String,
      trim: true,
      // required: [true, 'Please provide the plural form of the Kinyarwanda word'],
    },
    fr_word_sing: {
      type: String,
      trim: true,
      // required: [true, 'Please provide the singular form of the French word'],
    },
    fr_word_pl: {
      type: String,
      trim: true,
      // required: [true, 'Please provide the plural form of the French word'],
    },
    eng_sing_phonetic: {
      type: String,
      trim: true,
      // required: [true, 'Please provide the plural form of the French word'],
    },
    eng_pl_phonetic: {
      type: String,
      trim: true,
      // required: [true, 'Please provide the plural form of the French word'],
    },
    kiny_sing_phonetic: {
      type: String,
      trim: true,
      // required: [true, 'Please provide the plural form of the French word'],
    },
    kiny_pl_phonetic: {
      type: String,
      trim: true,
      // required: [true, 'Please provide the plural form of the French word'],
    },
    fr_sing_phonetic: {
      type: String,
      trim: true,
      // required: [true, 'Please provide the plural form of the French word'],
    },
    fr_pl_phonetic: {
      type: String,
      trim: true,
      // required: [true, 'Please provide the plural form of the French word'],
    },
    image: {
      type: String,
      default: '/uploads/example.jpeg',
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
    fr_tags: {
      type: [String],
      // required: [true, 'Please provide word tag'],
    },
    eng_synonyms: {
      type: [String],
      // required: [true, 'Please provide word tag'],
    },
    kiny_synonyms: {
      type: [String],
      // required: [true, 'Please provide word tag'],
    },
    fr_synonyms: {
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

WordSchema.pre('remove', async function (next) {
  await this.model('Review').deleteMany({ word: this._id });
});

module.exports = mongoose.model('Word', WordSchema);
