const express = require("express");
const router = express.Router();

const {
  sendWordCorrection,
  getAllWordCorrections
} = require("../controllers/wordCorrectionController");

router
  .route("/")
  .get(getAllWordCorrections)
  .post(sendWordCorrection);

module.exports = router;
