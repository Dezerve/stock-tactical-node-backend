require("dotenv").config();
const mockData = require("./words_v1.json");
const Word = require("../models/Word");
const connectDB = require("../db/connect");
const fs = require("fs");
const { isTypedArray } = require("util/types");

const start = async () => {
  try {
    await connectDB("mongodb://127.0.0.1:27017/isomo");
    // await connectDB("mongodb+srv://dezerveinfo:vm%24munyak59%23timpfmgdb%23@isomo.v7orpl6.mongodb.net/isomo-all-words?retryWrites=true&w=majority");
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


      // fs.writeFile(
      //   "./mockData/allTopics.js",  {encoding: 'string', flag: "a+"},
      //   `${JSON.stringify({
      //     topicTitle: `${uniqueTopicsArray[i]}`,
      //     topicCount: `${getWordsByTopic.length}`,
      //     topicSections: `${Number(sections)}`,
      //   })}\r\n`,
      //   (err) => {
      //     if (err) {
      //       return console.log("Error adding topics to allTopcis");
      //     }
      //     console.log("Success!!! Topics successfully added to allTopics!");
      //   }
      // );
    }
    
    // console.log('topics: ', topicsInfo)
    let obj = {
      topicsInfo
    };

    fs.writeFile("./mockData/allTopics.js", JSON.stringify(obj), (err) => {
      if (err) {
        return console.log("Error adding topics to allTopcis");
      }
      console.log("Success!!! Topics successfully added to allTopics!");
    });

    // start log
    process.env.NODE_ENV?.toLowerCase().trim() === "production" ||
    process.env.NODE_ENV?.toLowerCase().trim() === "prod"
      ? console.log("OK")
      : console.log("Success!!!");
    // end log
    process.exit(0);
  } catch (error) {
    // start log
    process.env.NODE_ENV?.toLowerCase().trim() === "production" ||
    process.env.NODE_ENV?.toLowerCase().trim() === "prod"
      ? console.log("Somthing went wrong. Try reloading!")
      : console.log("error: ", error);
    // end log
    process.exit(1);
  }
};

start();
