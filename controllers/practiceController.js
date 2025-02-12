const Word = require("../models/Word");
const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");
const _ = require("lodash");
// const path = require("path");

const { devMsgLogger, devValueLogger } = require("../utils/devLogger");

const getPracticeQuestions = async (req, res) => {
  const freeApiKey = req.query.apiKey;
  if (!freeApiKey || freeApiKey !== process.env.FREE_TRIAL_API_KEY) {
    res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ msg: "You are not authorized to view this content!" });
    return;
  }

  const { t, q, a, n } = req.query; // t = tag, q = question category, a = answer category,n = numQuestion
  const questionObject = {};
  const answerObject = {};

  if (q) {
    questionObject.eng_tags = q;
    questionObject.kiny_word_sing = { $ne: "" };
    questionObject.eng_word_sing = { $ne: "" };
  }
  if (a) {
    answerObject.eng_tags = a;
    answerObject.kiny_word_sing = { $ne: "" };
    answerObject.eng_word_sing = { $ne: "" };
  }

  // start log
  process.env.NODE_ENV?.toLowerCase().trim() === "production" || "prod"
    ? devMsgLogger("Something went wrong. Try reloading!")
    : devValueLogger("qst obj", questionObject);
  process.env.NODE_ENV?.toLowerCase().trim() === "production" || "prod"
    ? devMsgLogger("Something went wrong. Try reloading!")
    : devValueLogger("ans obj", answerObject);
  // end log

  let questions;
  let answers;
  // get all questions
  if (questionObject.q !== "") {
    // questions = Word.find(questionObject)
    //   .select("eng_word_sing kiny_word_sing eng_tags")
    //   .limit(n);

    // questions = await Word.aggregate([
    //   { $match: { eng_tags: q } }, // Filter by specific `eng_tags`
    //   { $sample: { size: Number(n) } }, // Randomly select 4 documents
    //   { $project: { eng_word_sing: 1, kiny_word_sing: 1, eng_tags: 1 } }, // Include only the specified fields
    // ]);

    // making sure no empty strings
    questions = await Word.aggregate([
      { $match: { eng_tags: q } }, // Filter by specific `eng_tags`
      {
        $match: {
          $and: [
            { eng_word_sing: { $ne: "" } }, // eng_word_sing is not an empty string
            { kiny_word_sing: { $ne: "" } }, // kiny_word_sing is not an empty string
          ],
        },
      },
      { $sample: { size: Number(n) } }, // Randomly select 4 documents
      { $project: { eng_word_sing: 1, kiny_word_sing: 1, eng_tags: 1 } }, // Include only the specified fields
    ]);

    devMsgLogger(questions);
  } else {
    devMsgLogger("Error getting questions.");
  }
  // get all answers
  if (answerObject.a !== "") {
    // answers = Word.find(answerObject).select("eng_word_sing kiny_word_sing eng_tags").limit(n);

    // answers = await Word.aggregate([
    //   { $match: { eng_tags: a } }, // Filter by specific `eng_tags`
    //   // { $sample: { size: Number(n) } }, // Randomly select 4 documents
    //   { $project: { eng_word_sing: 1, kiny_word_sing: 1, eng_tags: 1 } }, // Include only the specified fields
    // ]);

    // making sure no empty strings
    answers = await Word.aggregate([
      { $match: { eng_tags: a } }, // Filter by specific `eng_tags`
      {
        $match: {
          $and: [
            { eng_word_sing: { $ne: "" } }, // eng_word_sing is not an empty string
            { kiny_word_sing: { $ne: "" } }, // kiny_word_sing is not an empty string
          ],
        },
      },
      // { $sample: { size: Number(n) } }, // Randomly select 4 documents (commented out)
      { $project: { eng_word_sing: 1, kiny_word_sing: 1, eng_tags: 1 } }, // Include only the specified fields
    ]);

    devMsgLogger(answers);
  } else {
    devMsgLogger("Error getting answers.");
  }
  const answersArray = _.values(answers);

  const createPracticeSet = async () => {
    let set = [];
    const size = n - 2
    if (t === "mcq") {
      for (let i = 0; i < n; i++) {
        let answerOptions = _.sampleSize(answersArray, size);
        let allAnswers = _.concat(answerOptions, questions[i]);
        set.push({
          correctAnswer: questions[i],
          question: questions[i],
          answers: _.shuffle(allAnswers),
        });
      }
      return set;
    }
  };

  const words = await createPracticeSet();

  res.status(StatusCodes.OK).json({ words: words });
};

module.exports = {
  getPracticeQuestions,
};
