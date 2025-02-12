const Word = require("../models/Word");
const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");
const path = require("path");

const getTopicsData = async (req, res) => {
  const freeApiKey = req.query.apiKey;
  if (!freeApiKey || freeApiKey !== process.env.FREE_TRIAL_API_KEY) {
    res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ msg: "You are not authorized to view this content!" });
    return;
  }

  const words = await Word.find({});

  // using array flattening to get all tags
  const topicsArray = Array.prototype.concat.apply(
    [],
    words.map((word) => word.eng_tags)
  );

  let uniqueTopicsArray = [];

  topicsArray.map((tag) => {
    if (!uniqueTopicsArray.includes(tag)) {
      uniqueTopicsArray.push(tag);
    }
    return uniqueTopicsArray;
  });

  let topicsInfo = [];

  for (let i = 0; i < uniqueTopicsArray.length; i++) {
    const getWordsByTopic = await Word.where({
      eng_tags: uniqueTopicsArray[i],
    });
    const sections =
      Number(getWordsByTopic.length % 10) !== 0
        ? Number(Math.floor(getWordsByTopic.length / 10) + 1)
        : Number(getWordsByTopic.length / 10);
    topicsInfo.push({
      topicTitle: `${uniqueTopicsArray[i]}`,
      topicCount: `${getWordsByTopic.length}`,
      topicSections: `${Number(sections)}`,
    });
  }

  res.status(StatusCodes.OK).json({ topics: topicsInfo });
};

module.exports = {
  getTopicsData,
};
