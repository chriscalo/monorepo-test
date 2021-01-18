#!/usr/bin/env node
const { Command } = require("commander");
const { CommandBuilder, exec } = require("./util.js");

const program = new Command();

program
  .command("dev", { isDefault: true })
  .description("start dev servers")
  .action(async function () {
    exec("yarn workspace server dev");
  });

program.parse(process.argv);
