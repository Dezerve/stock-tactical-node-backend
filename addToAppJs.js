const axios = require("axios");
const cheerio = require("cheerio");
const sqlite3 = require("sqlite3").verbose();
const cron = require("node-cron");

// Set up SQLite Database
const db = new sqlite3.Database("./percent_increase.db", (err) => {
  if (err) {
    console.error("Database opening error: ", err);
  }
});

// Create table if it doesn't exist
db.run(`
  CREATE TABLE IF NOT EXISTS stocks (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    url TEXT NOT NULL,
    stock_name TEXT NOT NULL,
    ticker TEXT NOT NULL,
    price REAL NOT NULL,
    percent_change REAL NOT NULL,
    date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  )
`);

// Function to fetch and save stock data from a URL
const getStockDataFromPage = async (url) => {
  try {
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);

    // Find the table containing the stock data
    const rows = $("table.stock-table tbody tr");

    rows.each((index, row) => {
      const stockName = $(row).find("td.stock-name").text().trim();
      const ticker = $(row).find("td.stock-ticker").text().trim();
      const price = parseFloat(
        $(row).find("td.stock-price").text().trim().replace(",", "")
      );
      const percentChange = parseFloat(
        $(row).find("td.stock-percent").text().trim().replace("%", "")
      );

      // Skip if data is missing
      if (!stockName || !ticker || isNaN(price) || isNaN(percentChange)) {
        return;
      }

      // Save the stock data into the database
      db.run(
        "INSERT INTO stocks (url, stock_name, ticker, price, percent_change) VALUES (?, ?, ?, ?, ?)",
        [url, stockName, ticker, price, percentChange],
        (err) => {
          if (err) {
            console.error("Error inserting stock data into SQLite:", err);
          } else {
            console.log(`Stock data saved: ${stockName} (${ticker})`);
          }
        }
      );
    });
  } catch (error) {
    console.error("Error fetching or parsing the page:", error);
  }
};

// Schedule a cron job to fetch data from URL 1 every day at midnight
cron.schedule("0 0 * * *", async () => {
  const url1 = "https://example.com/page1"; // Replace with your actual URL
  await getStockDataFromPage(url1);
  console.log("Stock data from URL 1 fetched and saved at " + new Date());
});

// Schedule a cron job to fetch data from URL 2 every day at midnight
cron.schedule("0 0 * * *", async () => {
  const url2 = "https://example.com/page2"; // Replace with your actual URL
  await getStockDataFromPage(url2);
  console.log("Stock data from URL 2 fetched and saved at " + new Date());
});

// Optionally, create an endpoint to view the stock data stored in SQLite
app.get("/percent-increase", (req, res) => {
  db.all("SELECT * FROM stocks", (err, rows) => {
    if (err) {
      console.error("Error fetching data from SQLite:", err);
      res.status(500).send("Error fetching data");
      return;
    }
    res.json(rows);
  });
});
