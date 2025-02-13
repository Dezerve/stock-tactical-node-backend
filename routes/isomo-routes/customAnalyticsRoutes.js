const express = require("express");
const router = express.Router();
// const customAnalyticsController = require('../controllers/customAnalyticsController');

const {
  postAnalyticsData,
  getAnalyticsData,
} = require("../controllers/customAnalyticsController");

// router.post('/custom-analytics', customAnalyticsController.postAnalyticsData);
// router.get('/custom-analytics', customAnalyticsController.getAnalyticsData);

router
  .route("/")
  .post(postAnalyticsData) // POST analytics data
  .get(getAnalyticsData); // GET analytics data

module.exports = router;
