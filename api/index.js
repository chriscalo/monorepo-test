const express = require("express");

const api = express();

api.get("/", (req, res) => {
  res.send("Hello, World!");
});

api.listen(9000, function () {
  const { port } = this.address();
  console.log(`App listening at ${port}`);
  console.log(`Press Ctrl+C to quit.`);
});
