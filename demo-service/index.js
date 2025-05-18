// demo-service/index.js
const express = require('express');
const app = express();

app.get('/', (_, res) => res.send("🚀 Demo service is running"));

app.listen(4000, () => console.log("Demo service on port 4000"));
