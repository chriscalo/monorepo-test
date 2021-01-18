const execa = require("execa");
const PrettyError = require("pretty-error");

async function exec(command, options = {}) {
  command = String(command);
  return execa.command(command, {
    shell: true,
    stdio: "inherit",
    preferLocal: true,
    ...options,
  }).catch(error => {
    console.log(prettyError(error));
  });
}

exports.exec = exec;

function prettyError(error) {
  return new PrettyError().render(error);
}
