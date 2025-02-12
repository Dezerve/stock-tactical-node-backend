const express = require("express");
const router = express.Router();
const {
  authenticateUser,
  authorizePermissions,
} = require("../middleware/authentication");

const {
  serviceUp,
} = require("../controllers/serviceUpController");

router
  .route("/")
  .get(serviceUp);

module.exports = router;
