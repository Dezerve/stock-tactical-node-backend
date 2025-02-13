const express = require("express");
const router = express.Router();

const {
    getPracticeQuestions
} = require("../controllers/practiceController");

router
  .route("/")
  .get(getPracticeQuestions);

module.exports = router;
