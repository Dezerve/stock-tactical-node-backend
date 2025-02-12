const express = require("express");
const router = express.Router();
// const {
//   authenticateUser,
//   authorizePermissions,
// } = require("../middleware/authentication");

const { getRevenueCatPublicKey } = require("../controllers/revenueCatController");

router.route("/").get(getRevenueCatPublicKey);

module.exports = router;
