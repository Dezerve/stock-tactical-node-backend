const mongoose = require("mongoose");

const AddedWordSchema = new mongoose.Schema({
  word: {
    type: mongoose.Types.ObjectId,
    ref: "Word",
    required: true,
  },
  //   word: {
  //     type: String,
  //     required: true,
  //     trim: true,
  //     minlength: 1,
  //     maxlength: 50,
  //   },
  translation: {
    type: String,
    required: true,
    trim: true,
    minlength: 1,
    maxlength: 200,
  },
  sourceLanguage: {
    type: String,
    required: true,
    trim: true,
    minlength: 1,
    maxlength: 200,
  },
  targetLanguage: {
    type: String,
    required: true,
    trim: true,
    minlength: 1,
    maxlength: 200,
  },
  createdBy: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
    required: true,
  },
});

module.exports = mongoose.model("AddedWord", AddedWordSchema);
