app.get("/stocks", (req, res) => {
  db.all("SELECT * FROM stocks", (err, rows) => {
    if (err) {
      console.error("Error fetching data from SQLite:", err);
      res.status(500).send("Error fetching data");
      return;
    }
    res.json(rows);
  });
});
