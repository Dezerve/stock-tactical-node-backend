const Word = require("../models/Word");
const AddedWord = require("../models/addAndContributeModels/AddedWord");

const addAndContributeController = {
  createNewItem: async (req, res) => {
    try {
      const { wordId, translation, translationLanguage } = req.body;
      const word = await Word.findById(wordId);
      if (!word) {
        return res.status(404).json({ message: "Word not found" });
      }
      const newWord = new AddedWord({
        word: wordId,
        translation,
        translationLanguage,
        createdBy: req.user._id, // populate createdBy field with user ID
      });
      await newWord.save();
      res.status(201).json({ message: "New word added successfully" });
    } catch (error) {
      res.status(400).json({ message: "Error adding new word" });
    }
  },
};

module.exports = {
  addAndContributeController,
};
