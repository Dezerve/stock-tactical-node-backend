const yahooFinance = require("yahoo-finance2").default;
const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "using_node_yahoo_finance_day_gainers.json");

async function getYahooMostActives() {
  const queryOptions = {
    scrIds: "day_gainers",
    count: 20,
    region: "US",
    lang: "en-US",
  };

  try {
    const results = await yahooFinance.screener(queryOptions);
    // Save the content to a file
    fs.writeFileSync(filePath, results);
    console.log(`Page content saved to ${filePath}`);
  } catch (error) {
    console.error("Error fetching or saving the page:", error);
  }
}

getYahooMostActives();
