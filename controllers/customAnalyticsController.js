const CustomAnalytics = require("../models/CustomAnalytics");
const { StatusCodes } = require("http-status-codes");

// Controller function to handle analytics data
const postAnalyticsData = async (req, res) => {
  const freeApiKey = req.query.apiKey;
  if (!freeApiKey || freeApiKey !== process.env.FREE_TRIAL_API_KEY) {
    res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ msg: "You are not authorized to view this content!" });
    return;
  }

  //   try {
  //     const { pageUrl, sessionId } = req.body;

  //     // Check if there is an existing analytics document for the same session and page URL
  //     const existingAnalytics = await CustomAnalytics.findOne({
  //       pageUrl,
  //       sessionId,
  //       // idAddress
  //     });

  //     if (existingAnalytics) {
  //       // If exists, update the timestamp and increment views
  //       existingAnalytics.timestamp = Date.now();
  //       existingAnalytics.views += 1;
  //       await existingAnalytics.save();
  //       res.status(200).json({ message: "Analytics data updated successfully." });
  //     } else {
  //       // If not exists, create a new document
  //       const analyticsData = new CustomAnalytics({
  //         pageUrl,
  //         sessionId,
  //         // ipAddress,
  //       });
  //       await analyticsData.save();
  //       res.status(201).json({ message: "Analytics data saved successfully." });
  //     }
  //   } catch (error) {
  //     console.error("Error saving/updating analytics data:", error);
  //     res.status(500).json({ error: "Internal Server Error" });
  //   }

  try {
    const { pageUrl, sessionId } = req.body;

    // Find the analytics document for the session
    let analyticsData = await CustomAnalytics.findOne({ sessionId });

    if (analyticsData) {
      // If document exists, update the timestamp and increment views for the specific page
      const pageDataIndex = analyticsData.pages.findIndex(
        (page) => page.pageUrl === pageUrl
      );
      if (pageDataIndex !== -1) {
        analyticsData.pages[pageDataIndex].timestamp = Date.now();
        analyticsData.pages[pageDataIndex].views += 1;
      } else {
        // If the page data doesn't exist, add it
        analyticsData.pages.push({
          pageUrl,
          timestamp: Date.now(),
          views: 1,
        });
      }
    } else {
      // If no document exists for the session, create a new one
      analyticsData = new CustomAnalytics({
        sessionId,
        pages: [
          {
            pageUrl,
            timestamp: Date.now(),
            views: 1,
          },
        ],
      });
    }

    await analyticsData.save();
    res.status(200).json({ message: "Analytics data updated successfully." });
  } catch (error) {
    console.error("Error saving/updating analytics data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Controller function to get analytics data
const getAnalyticsData = async (req, res) => {
  const freeApiKey = req.query.apiKey;
  if (!freeApiKey || freeApiKey !== process.env.FREE_TRIAL_API_KEY) {
    res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ msg: "You are not authorized to view this content!" });
    return;
  }

  try {
    const analyticsData = await CustomAnalytics.find()
      .sort({ timestamp: -1 })
      .limit(10); // Adjust as needed

    res.status(200).json(analyticsData);
  } catch (error) {
    console.error("Error getting analytics data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { postAnalyticsData, getAnalyticsData };
