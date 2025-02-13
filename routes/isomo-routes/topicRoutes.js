const express = require("express");
const router = express.Router();
const {
  authenticateUser,
  authorizePermissions,
} = require("../middleware/authentication");

const {
  getTopicsData,
} = require("../controllers/topicController");

router.route("/").get(getTopicsData);

module.exports = router;
