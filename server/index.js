const express = require("express");
const { findPort } = require("express-start/find-port");
const { createProxyMiddleware } = require("http-proxy-middleware");
const { exec } = require("./util.js");

const server = express();

async function main() {
  const [
    PORT,
    FE_PORT,
    API_PORT,
  ] = await Promise.all([
    findPort(process.env.PORT || 8000),
    findPort(6000),
    findPort(5000),
  ]);
  
  console.log("ports", {
    PORT,
    FE_PORT,
    API_PORT,
  });
  
  exec("yarn workspace frontend dev", { env: { PORT: FE_PORT } });
  exec("yarn workspace api dev", { env: { PORT: API_PORT } });
  
  // api
  server.use("/api", createProxyMiddleware({
    target: `http://localhost:${API_PORT}`,
    pathRewrite: (path, req) => path.replace("/api", "/"),
  }));
  
  // frontend
  server.use(createProxyMiddleware({
    target: `http://localhost:${FE_PORT}`,
    ws: true,
  }));
  
  server.listen(PORT, function onstart() {
    const { port } = this.address();
    console.log(``);
    console.log(`Server running at http://localhost:${port}`);
    console.log(`Press Ctrl+C to quit.`);
    console.log(``);
  });
}

main();
