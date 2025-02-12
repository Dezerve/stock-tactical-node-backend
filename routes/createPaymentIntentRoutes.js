const express = require("express");
const router = express.Router();
// const {
//   authenticateUser,
//   authorizePermissions,
// } = require("../middleware/authentication");

const {
  createPaymentIntent,
  getStripePublicKey
} = require("../controllers/createPaymentIntentController");

router.route("/")
  .get(getStripePublicKey)
  .post(createPaymentIntent);

module.exports = router;
