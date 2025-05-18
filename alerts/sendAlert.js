const axios = require("axios");
require("dotenv").config();

axios
  .post(process.env.DISCORD_WEBHOOK_URL, {
    content: "🚨 AutoHeal Alert: High resource usage or service down!",
  })
  .then(() => console.log("Alert sent"))
  .catch(console.error);
