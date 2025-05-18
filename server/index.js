const express = require("express");
const fs = require("fs");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.static("public"));

app.get("/metrics", (req, res) => {
  const data = fs.readFileSync("../autoheal.log", "utf8");
  const lines = data.trim().split("\n");
  const entries = lines.map((line) => {
    const [timestamp, status, ...rest] = line.split(":");
    return { timestamp, status, details: rest.join(":").trim() };
  });
  res.json(entries);
});

app.listen(3000, () => {
  console.log("Dashboard running at http://localhost:3000");
});
