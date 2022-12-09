const { spawn, execFile } = require("child_process");
const path = require("path");

const PY_FILE = path.join(__dirname, "../index.py");
const EXE_FILE = path.join(__dirname, "../../dist/backend.exe");

const pyshell = (action, args) => {
  args = JSON.stringify(args);
  let shell = process.env.DEV
    ? spawn("python", [PY_FILE, action, args])
    : execFile(EXE_FILE, [action, args]);

  shell.stderr.on("data", (data) => {
    console.error(data);
  });

  return shell;
};

exports.pyshell = pyshell;
