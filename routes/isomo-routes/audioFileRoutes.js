const express = require("express");
const router = express.Router();
const {
  authenticateUser,
  authorizePermissions,
} = require("../middleware/authentication");

const { getAudioFile } = require("../controllers/audioFileController");

router.route("/").get(getAudioFile);

module.exports = router;
