require("dotenv").config();
// const mockData = require("./words_v1.json");
const mockData = require("./greetings_convo_test.json");
const Conversation = require("../models/Conversation");
const connectDB = require("../db/connect");

const start = async () => {
  try {
    await connectDB("mongodb://127.0.0.1:27017/isomo");
    // await connectDB("mongodb+srv://dezerveinfo:vm%24munyak59%23timpfmgdb%23@isomo.v7orpl6.mongodb.net/isomo-all-words?retryWrites=true&w=majority");
    // await Word.deleteMany();
    await Conversation.insertMany(mockData);
    // await Word.updateMany({"eng_tags": ["more greetings"]}, {"$set":{"eng_tags": ["other greetings"]}});
      
  // start log
  process.env.NODE_ENV?.toLowerCase().trim() === "production" ||
  process.env.NODE_ENV?.toLowerCase().trim() === "prod"
    ? console.log("Something went wrong. Try reloading!")
    : console.log("Success !!!");
  // end log

    process.exit(0);
  } catch (error) {      
    // start log
    process.env.NODE_ENV?.toLowerCase().trim() === "production" ||
    process.env.NODE_ENV?.toLowerCase().trim() === "prod"
      ? console.log("Something went wrong. Try reloading!")
      : console.log("error: ", error);
    // end log
    process.exit(1);
  }
};

start();
