const express = require("express");
const fs = require("fs");
const path = require("path");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.static(path.join(__dirname, "../public")));

// Serve dashboard.html on root
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/dashboard.html"));
});

// Serve logs as JSON
app.get("/metrics", (req, res) => {
  const data = fs.readFileSync(path.join(__dirname, "../autoheal.log"), "utf8");
  const lines = data.trim().split("\n");
  const entries = lines.map((line) => {
    const [timestamp, status, ...rest] = line.split(":");
    return { timestamp, status, details: rest.join(":").trim() };
  });
  res.json(entries);
});

app.listen(3000, () => {
  console.log("✅ Dashboard running at http://localhost:3000");
});
