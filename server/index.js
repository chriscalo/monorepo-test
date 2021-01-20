const express = require("express");
const { findPort } = require("express-start/find-port");
const { createProxyMiddleware } = require("http-proxy-middleware");
const { exec } = require("./util.js");

const server = express();

const registry = {};

async function main() {
  findPort(process.env.PORT || 8000).then(function (PORT) {
    registry.main = PORT;
    
    server.listen(PORT, function onstart() {
      const { port } = this.address();
      console.log(``);
      console.log(`Server running at http://localhost:${port}`);
      console.log(`Press Ctrl+C to quit.`);
      console.log(``);
    });
    
    console.table({
      PORT,
    });
  });
  
  const [
    API_PORT,
    FE_PORT,
  ] = await Promise.all([
    findPort(6000),
    findPort(7000),
  ]);
  
  // api
  exec("yarn workspace api dev", {
    env: { PORT: API_PORT },
  });
  server.use("/api", createProxyMiddleware({
    target: `http://localhost:${API_PORT}`,
    pathRewrite: (path, req) => path.replace("/api", "/"),
  }));
  
  // frontend
  exec("yarn workspace frontend dev", {
    env: { PORT: FE_PORT },
  });
  server.use(createProxyMiddleware({
    target: `http://localhost:${FE_PORT}`,
    ws: true,
  }));
}

main();
