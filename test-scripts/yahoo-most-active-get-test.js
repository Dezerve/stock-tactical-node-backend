const axios = require("axios");
const fs = require("fs");
const path = require("path");

// URL of the page you want to fetch
const url = "https://finance.yahoo.com/markets/stocks/most-active/?start=0&count=100";

// File path where the content will be saved
const filePath = path.join(__dirname, "yahoo_most_active_test_page.html");

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
