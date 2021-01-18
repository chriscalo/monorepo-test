#!/usr/bin/env node
const { Command } = require("commander");
const { findPort } = require("express-start/find-port");
const { CommandBuilder, exec } = require("./util.js");

const program = new Command();

program
  .command("dev", { isDefault: true })
  .description("start dev servers")
  .action(async function () {
    const [
      FE_PORT,
      API_PORT,
    ] = await Promise.all([
      findPort(8080),
      findPort(9000),
    ]);
    
    exec("yarn workspace frontend dev", { env: { PORT: FE_PORT } });
    exec("yarn workspace api dev", { env: { PORT: API_PORT } });
  });

program.parse(process.argv);
