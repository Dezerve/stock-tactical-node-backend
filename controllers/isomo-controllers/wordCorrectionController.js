const { StatusCodes } = require("http-status-codes");
const WordCorrection = require('../models/WordCorrection');
const { devMsgLogger, devValueLogger } = require('../utils/devLogger');

const sendWordCorrection = async (req, res) => {
  const freeApiKey = req.query.apiKey;
  if (!freeApiKey || freeApiKey !== process.env.FREE_TRIAL_API_KEY) {
    res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ msg: "You are not authorized to view this content!" });
    return;
  }

  try {
    const { word, translation, sourceLang, targetLang  } = req.body;
    const wordCorrection = new WordCorrection({ word, translation, sourceLang, targetLang });
    await wordCorrection.save();
    res.json({ success: true, message: 'Word correction added successfully' });
  } catch (error) {
    devMsgLogger(error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};

const getAllWordCorrections = async (req, res) => {
  const freeApiKey = req.query.apiKey;
  if (!freeApiKey || freeApiKey !== process.env.FREE_TRIAL_API_KEY) {
    res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ msg: "You are not authorized to view this content!" });
    return;
  }

  try {
    // const wordCorrections = await WordCorrection.find()
    //   .sort({ timestamp: -1 })
    //   .limit(10); // Adjust as needed

    // res.status(200).json(wordCorrections);
    res.status(200).json({ response: 'Word correction route' });
  } catch (error) {
    devValueLogger("Error getting corrected words", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  sendWordCorrection,
  getAllWordCorrections,
};
