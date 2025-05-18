const axios = require("axios");
const WEBHOOK_URL = "https://discord.com/api/webhooks/your-webhook-url"; // Replace

axios
  .post(WEBHOOK_URL, {
    content: "🚨 AutoHeal Alert: High resource usage or service down!",
  })
  .then(() => console.log("Alert sent"))
  .catch(console.error);
