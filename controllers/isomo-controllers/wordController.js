const Word = require("../models/Word");
const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");
// const path = require("path");
const { devMsgLogger, devValueLogger } = require("../utils/devLogger");

const createWord = async (req, res) => {
  req.body.user = req.user.userId;
  const word = await Product.create(req.body);
  res.status(StatusCodes.CREATED).json({ word });
};

const getAllWords = async (req, res) => {
  // const words = await Word.find({ eng_tags: "Big Cats" });
  // res.status(StatusCodes.OK).json({ words, count: words.length });

  const freeApiKey = req.query.apiKey;
  if (!freeApiKey || freeApiKey !== process.env.FREE_TRIAL_API_KEY) {
    res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ msg: "You are not authorized to view this content!" });
    return;
  }

  const { tag, ltr } = req.query;
  const queryObject = {};

  if (tag) {
    queryObject.eng_tags = tag;
    queryObject.kiny_word_sing = { $ne: "" };
    queryObject.eng_word_sing = { $ne: "" };
  }
  if (ltr) {
    queryObject.ltr = ltr;
    queryObject.kiny_word_sing = { $ne: "" };
    queryObject.eng_word_sing = { $ne: "" };
  }

  // start log
  process.env.NODE_ENV?.toLowerCase().trim() === "production" || "prod"
    ? devMsgLogger("Something went wrong. Try reloading!")
    : devValueLogger("query obj", queryObject);
  // end log

  let result;
  if (queryObject.tag !== "") {
    result = Word.find(queryObject)
      .select("eng_word_sing kiny_word_sing eng_tags")
      // .sort({ eng_word_sing: 1 });
  }

  // if specific letter
  if (queryObject.ltr) {
    const regex = new RegExp("^" + `${ltr}`, "i");
    result = Word.find({
      eng_word_sing: { $regex: regex },
    })
      .select("eng_word_sing kiny_word_sing eng_tags")
      .sort({ eng_word_sing: 1 });
  }

  const words = await result;

  res.status(StatusCodes.OK).json({ words });
};

const getSingleWord = async (req, res) => {
  const { id: wordId } = req.params;

  //   const word = await Word.findOne({ _id: wordId }).populate('reviews');
  const word = await Word.findOne({ _id: wordId });

  if (!word) {
    throw new CustomError.NotFoundError(`No word with id : ${wordId}`);
  }

  res.status(StatusCodes.OK).json({ word });
};

const updateWord = async (req, res) => {
  const { id: wordId } = req.params;

  const word = await Word.findOneAndUpdate({ _id: wordId }, req.body, {
    new: true,
    runValidators: true,
  });

  if (!word) {
    throw new CustomError.NotFoundError(`No word with id : ${wordId}`);
  }

  res.status(StatusCodes.OK).json({ word });
};

const deleteWord = async (req, res) => {
  const { id: wordId } = req.params;

  const product = await Word.findOne({ _id: wordId });

  if (!product) {
    throw new CustomError.NotFoundError(`No word with id : ${wordId}`);
  }

  await product.remove();
  res.status(StatusCodes.OK).json({ msg: "Success! Word removed." });
};

/*
const uploadImage = async (req, res) => {
  if (!req.files) {
    throw new CustomError.BadRequestError('No File Uploaded');
  }
  const productImage = req.files.image;

  if (!productImage.mimetype.startsWith('image')) {
    throw new CustomError.BadRequestError('Please Upload Image');
  }

  const maxSize = 1024 * 1024;

  if (productImage.size > maxSize) {
    throw new CustomError.BadRequestError(
      'Please upload image smaller than 1MB'
    );
  }

  const imagePath = path.join(
    __dirname,
    '../public/uploads/' + `${productImage.name}`
  );
  await productImage.mv(imagePath);
  res.status(StatusCodes.OK).json({ image: `/uploads/${productImage.name}` });
};
*/

module.exports = {
  createWord,
  getAllWords,
  getSingleWord,
  updateWord,
  deleteWord,
  // uploadImage,
};
