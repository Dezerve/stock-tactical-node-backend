require("dotenv").config();
require("express-async-errors");
const port = process.env.PORT || 5001;

// express
const express = require("express");
const app = express();

// node-cron
const cron = require("node-cron");

// added for srtipe
const bodyParser = require("body-parser");
const stripe = require("stripe")(`${process.env.STRIPE_SECRET_KEY}`);
app.use(bodyParser.json());

// rest of the packages
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload");
// const rateLimiter = require("express-rate-limit");
const helmet = require("helmet");
const xss = require("xss-clean");
const cors = require("cors");
const mongoSanitize = require("express-mongo-sanitize");
const compression = require("compression");

// database
const connectDB = require("./db/connect");

//  routes
const serviceUpRouter = require("./routes/serviceUpRoutes");
const authRouter = require("./routes/authRoutes");
const userRouter = require("./routes/userRoutes");
const productRouter = require("./routes/productRoutes");
const reviewRouter = require("./routes/reviewRoutes");
const orderRouter = require("./routes/orderRoutes");
const wordRouter = require("./routes/wordRoutes");
const conversationRouter = require("./routes/conversationRoutes");
const customAnalyticsRouter = require("./routes/customAnalyticsRoutes");
const topicRouter = require("./routes/topicRoutes");
const audioFileRouter = require("./routes/audioFileRoutes");
const wordCorrectionRouter = require("./routes/wordCorrectionRoutes");
const createPaymentIntentRouter = require("./routes/createPaymentIntentRoutes");
const revenueCatRouter = require("./routes/revenueCatRoutes");
const getPracticeRouter = require("./routes/practiceRoutes");

// middleware
const notFoundMiddleware = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");
const { devMsgLogger, devValueLogger } = require("./utils/devLogger");

// cors
app.use(cors());

//
app.set("trust proxy", 1);
// app.use(
//   rateLimiter({
//     windowMs: 15 * 60 * 1000,
//     max: 60,
//   })
// );
app.use(helmet());
app.use(xss());
app.use(mongoSanitize());
app.use(morgan("combined"));

// gzip compression
app.use(compression());

//
app.use(express.json());
app.use(cookieParser(process.env.JWT_SECRET));

app.use(express.static("./public"));
app.use(fileUpload());

app.use("/api/v1/service-check", serviceUpRouter);
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/products", productRouter);
app.use("/api/v1/reviews", reviewRouter);
app.use("/api/v1/orders", orderRouter);
app.use("/api/v1/words", wordRouter);
app.use("/api/v1/conversations", conversationRouter);
app.use("/api/v1/custom-analytics", customAnalyticsRouter);
app.use("/api/v1/topics", topicRouter);
app.use("/api/v1/audio", audioFileRouter);
app.use("/api/v1/word-correction", wordCorrectionRouter);
app.use("/api/v1/practice", getPracticeRouter);
app.use("/api/v1/create-payment-intent", createPaymentIntentRouter);
app.use("/revenue-cat", revenueCatRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

// Function to make the request
const checkAvailabilitypUrl =
  process.env.NODE_ENV?.toLowerCase().trim() !== "production" ||
  process.env.NODE_ENV?.toLowerCase().trim() !== undefined
    ? `http://localhost:${port}/api/v1/service-check`
    : `${process.env.SERVER_PROD_URL}/api/v1/service-check`;

const makeRequest = async () => {
  console.log("service health...");
  try {
    const response = await fetch(checkAvailabilitypUrl);
    if (!response.ok) {
      const errorData = await response.json();
      devMsgLogger("Error response:", errorData);
      devMsgLogger("Error status:", response.status);
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    // Handle the response data
    console.log("service health status...", response.status);
  } catch (error) {
    // Handle errors
    devMsgLogger("Error:", error);
  }
};

// health check
// cron.schedule("0 */4 * * *", () => {
//   devMsgLogger("Health check");
//   makeRequest();
// });

// start server
const start = async () => {
  try {
    if (process.env.NODE_ENV?.toLowerCase().trim() !== "production") {
      await connectDB(process.env.MONGO_URL_DEV);
    } else if (process.env.NODE_ENV?.toLowerCase().trim() === undefined) {
      await connectDB(process.env.MONGO_STAGING_URL);
    } else {
      await connectDB(process.env.MONGO_STAGING_URL);
    }
    app.listen(port, () => {
      devMsgLogger(`Server is listening on port ${port}...`);
      makeRequest();

      // schedule check with setInterval
      // Schedule the wake up task to execute on an interval
      // setInterval(makeRequest, 720000); // 12 minutes (720,000 milliseconds)
      // setInterval(makeRequest, 300000); // 5 minutes (300000 milliseconds)
      setInterval(() => {
        makeRequest();
      }, 40000); // 40 seconds (40,000 milliseconds)
    });
  } catch (error) {
    // start log
    process.env.NODE_ENV?.toLowerCase().trim() === "production" ||
    process.env.NODE_ENV?.toLowerCase().trim() === "prod" ||
    process.env.NODE_ENV?.toLowerCase().trim() === undefined
      ? devMsgLogger("Something went wrong. Try reloading!")
      : devValueLogger("error", error);
    // end log
  }
};

start();
