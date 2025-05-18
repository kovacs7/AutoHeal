const express = require("express");
const fs = require("fs");
const path = require("path");
const cors = require("cors");

const app = express();

// Enable CORS for development
app.use(cors());

// Serve static files from the public directory (dashboard.html, etc.)
app.use(express.static(path.join(__dirname, "../public")));

// Serve dashboard.html at the root
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/dashboard.html"));
});

// Serve log metrics
app.get("/metrics", (req, res) => {
  const logFilePath = path.join(__dirname, "../autoheal.log");

  try {
    const data = fs.readFileSync(logFilePath, "utf8");
    const lines = data.trim().split("\n").filter(Boolean);

    const entries = lines.map((line) => {
      // Regex match format: [timestamp]: [status]: [details]
      const match = line.match(/^(.*?):\s*(OK|DOWN):\s*(.*)$/);

      if (!match) return null; // Skip bad lines

      const [, timestamp, status, details] = match;
      return { timestamp, status, details };
    }).filter(Boolean); // Remove any nulls

    res.json(entries);
  } catch (err) {
    console.error("❌ Error reading log file:", err.message);
    res.status(500).json({ error: "Failed to read log file" });
  }
});


// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Dashboard running at http://localhost:${PORT}`);
});
