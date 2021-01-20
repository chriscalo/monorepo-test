const express = require("express");

const api = express();

// log all requests
api.use((req, res, next) => {
  console.log(`[api] ${req.method} ${req.url}`);
  next();
});

api.get("/", (req, res) => {
  res.send("Hello, World!");
});

api.listen(process.env.PORT, function onstart() {
  const { port } = this.address();
  console.log(`API listening on port ${port}`);
  console.log(`Press Ctrl+C to quit.`);
});
