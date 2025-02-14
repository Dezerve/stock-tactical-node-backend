const axios = require("axios");
const fs = require("fs");
const path = require("path");

// URL of the page you want to fetch
const url = "https://finance.yahoo.com";

// File path where the content will be saved
const filePath = path.join(__dirname, "stockscan_options_test_page.html");

// Function to fetch the page and save it to a file
async function fetchAndSavePage(url, filePath) {
  try {
    // Fetch the page content
    const response = await axios.get(url, {
      "method": "GET",
      "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8",
      "Accept-Encoding": "gzip, deflate, br, zstd",
      "Accept-Language": "en-US,en,q=0.8",
      'Sec-Fetch-Dest': 'document',
      'Sec-Fetch-Mode': 'navigate',
      'Sec-Gpc': '1',
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/133.0.0.0 Safari/537.36'
    });
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
