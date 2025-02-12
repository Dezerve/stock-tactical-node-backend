const devMsgLogger = (msg) => {
  if (
    process.env.NODE_ENV?.toLowerCase().trim() === "development" ||
    process.env.NODE_ENV?.toLowerCase().trim() === "dev"
  ) {
    console.log(`${msg}`);
  }
};

const devValueLogger = (msg, value) => {
  if (
    process.env.NODE_ENV?.toLowerCase().trim() === "development" ||
    process.env.NODE_ENV?.toLowerCase().trim() === "dev"
  ) {
    console.log(`${msg}: `, `${value || ""}`);
  }
};

module.exports = { devMsgLogger, devValueLogger };
