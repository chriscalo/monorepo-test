const express = require("express");

const api = express();

api.get("/", (req, res) => {
  console.log("GET /");
  res.send("Hello, World!");
});

api.listen(process.env.PORT || 9000, function onstart() {
  const { port } = this.address();
  console.log(`App listening at ${port}`);
  console.log(`Press Ctrl+C to quit.`);
});
