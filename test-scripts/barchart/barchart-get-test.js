const axios = require("axios");
const fs = require("fs");
const path = require("path");

// URL of the page you want to fetch
const url = "https://www.barchart.com/stocks/post-market-trading/volume-advances?orderBy=postMarketVolume&orderDir=desc&page=all";

// File path where the content will be saved
const filePath = path.join(__dirname, "barchat_test_page.html");

// Function to fetch the page and save it to a file
async function fetchAndSavePage(url, filePath) {
  try {
    // Fetch the page content
    const response = await axios.get(url);
    const pageContent = response.data;

    // Save the content to a file
    fs.writeFileSync(filePath, pageContent, "utf8");
    console.log(`Page content saved to ${filePath}`);
  } catch (error) {
    console.error("Error fetching or saving the page:", error);
  }
}

// Call the function
fetchAndSavePage(url, filePath);


////// found an example api
/*

https://www.barchart.com/proxies/core-api/v1/quotes/get?lists=stocks.us.postmarket.volume_advances&orderDir=desc&fields=symbol%2CsymbolName%2CpostMarketLastPrice%2CpostMarketPriceChange%2CpostMarketPercentChange%2CpostMarketVolume%2CpostMarketAverage5dVolume%2CpostMarketPreviousLast%2CpostMarketPreviousChange%2CpostMarketPreviousPercentChange%2CpostMarketTradeTime%2CnextEarningsDate%2CtimeCode%2CsymbolCode%2CsymbolType%2ChasOptions&orderBy=postMarketVolume&meta=field.shortName%2Cfield.type%2Cfield.description%2Clists.lastUpdate&hasOptions=true&raw=1

*/