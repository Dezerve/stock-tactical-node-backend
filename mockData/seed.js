require("dotenv").config();

// words
// const mockData = require("./words.json");
// const Word = require("../models/Word");

// conversations
// const mockData = require("./greetings_convo_test.json");
// const Word = require("../models/Conversation");

// users
const mockData = require("./mockUsers.json");
const Word = require("../models/User");

// connection
const connectDB = require("../db/connect");

const seedDB = async () => {
  try {
    await connectDB("mongodb://127.0.0.1:27017/isomo");
    // await connectDB("mongodb+srv://dezerveinfo:vm%24munyak59%23timpfmgdb%23@isomo.v7orpl6.mongodb.net/isomo-all-words?retryWrites=true&w=majority");
    await Word.deleteMany();
    await Word.create(mockData);
    console.log("Success !!!");
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

seedDB();
