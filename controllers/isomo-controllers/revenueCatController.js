const { StatusCodes } = require("http-status-codes");
const { devValueLogger } = require("../utils/devLogger");

const getRevenueCatPublicKey = (req, res) => {
  try {
    const stripePublicKey = process.env.REVENUE_CAT_PUBLIC_KEY;
    return res.json({ stripePublicKey });
  } catch (error) {
    devValueLogger("error getting stripe public key");
    return res.status(500).json({ error: "key not found" });
  }
};

module.exports = {
  getRevenueCatPublicKey,
};
