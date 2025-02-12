const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");
const path = require("path");
const Conversation = require("../models/Conversation");
const { devMsgLogger, devValueLogger } = require("../utils/devLogger");

const createConversation = async (req, res) => {
  req.body.user = req.user.userId;
  const conversation = await Product.create(req.body);
  res.status(StatusCodes.CREATED).json({ conversation });
};

const getAllConversations = async (req, res) => {
  // const conversations = await Conversation.find({ eng_tags: "Big Cats" });
  // res.status(StatusCodes.OK).json({ conversations, count: conversations.length });

  const freeApiKey = req.query.apiKey;
  if (!freeApiKey || freeApiKey !== process.env.FREE_TRIAL_API_KEY) {
    res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ msg: "You are not authorized to view this content!" });
    return;
  }

  const { cnum } = req.query;
  const queryObject = {};

  if (cnum) {
    queryObject.convo_num = cnum;
  }

  // start log
  process.env.NODE_ENV?.toLowerCase().trim() === "production" ||
  process.env.NODE_ENV?.toLowerCase().trim() === "prod"
    ? devMsgLogger("Something went wrong. Try reloading!")
    : devValueLogger("query obj", queryObject);
  // end log

  let result = Conversation.find(queryObject);
  const conversations = await result;

  res.status(StatusCodes.OK).json({ conversations });
};

const getSingleConversation = async (req, res) => {
  const { id: conversationId } = req.params;

  //   const Conversation = await Conversation.findOne({ _id: conversationId }).populate('reviews');
  const conversation = await Conversation.findOne({ _id: conversationId });

  if (!conversation) {
    throw new CustomError.NotFoundError(
      `No conversation with id : ${conversationId}`
    );
  }

  res.status(StatusCodes.OK).json({ conversation });
};

const updateConversation = async (req, res) => {
  const { id: conversationId } = req.params;

  const conversation = await Conversation.findOneAndUpdate(
    { _id: conversationId },
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );

  if (!conversation) {
    throw new CustomError.NotFoundError(
      `No product with id : ${conversationId}`
    );
  }

  res.status(StatusCodes.OK).json({ conversation });
};

const deleteConversation = async (req, res) => {
  const { id: conversationId } = req.params;

  const product = await Conversation.findOne({ _id: conversationId });

  if (!product) {
    throw new CustomError.NotFoundError(
      `No product with id : ${conversationId}`
    );
  }

  await product.remove();
  res.status(StatusCodes.OK).json({ msg: "Success! Product removed." });
};

module.exports = {
  createConversation,
  getAllConversations,
  getSingleConversation,
  updateConversation,
  deleteConversation,
};
