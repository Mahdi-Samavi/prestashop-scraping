const { BrowserWindow, ipcMain, Notification } = require("electron");
const path = require("path");
const HRPs = {};

function loadHRP(task, action) {
  const hiddenWindow = new BrowserWindow({
    show: false,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  hiddenWindow.loadURL(
    `file://${path.join(__dirname, "../app/Tasks/" + task + ".js.html")}`
  );

  // Open the DevTools.
  process.env.DEV && hiddenWindow.webContents.openDevTools();

  HRPs[task.toLowerCase() + ":" + action] = hiddenWindow;

  return hiddenWindow;
}

ipcMain.on("close", (event, args) => {
  let alias = args[0];

  if (alias in HRPs) {
    HRPs[alias].close();
    delete HRPs[alias];
  }
});

function notification(isSuccess, body) {
  return new Notification({
    icon: path.join(__dirname, "favicon.ico"),
    title: isSuccess ? "Successful operation" : "There is a problem",
    body: body,
  });
}

// ======================================================= //

ipcMain.handle("store:index", async (event, args) => {
  let contents = loadHRP("Store", "index").webContents;
  contents.send("index", args);

  return await new Promise((resolve) => {
    contents.on("ipc-message", (event, channel, args) => resolve(args));
  });
});

ipcMain.handle("store:add", async (event, args) => {
  let contents = loadHRP("Store", "add").webContents;
  contents.send("add", args);

  return await new Promise((resolve) => {
    contents.on("ipc-message", (event, channel, args) => {
      notification(args.success, args.message).show();

      resolve(args);
    });
  });
});

ipcMain.handle("store:get", async (event, args) => {
  let contents = loadHRP("Store", "get").webContents;
  contents.send("get", args);

  return await new Promise((resolve) => {
    contents.on("ipc-message", (event, channel, args) => {
      resolve(args);
    });
  });
});

ipcMain.handle("store:edit", async (event, args) => {
  let contents = loadHRP("Store", "edit").webContents;
  contents.send("edit", args);

  return await new Promise((resolve) => {
    contents.on("ipc-message", (event, channel, args) => {
      notification(args.success, args.message).show();
      resolve(args);
    });
  });
});

ipcMain.handle("store:destroy", async (event, args) => {
  let contents = loadHRP("Store", "destroy").webContents;
  contents.send("destroy", args);

  return await new Promise((resolve) => {
    contents.on("ipc-message", (event, channel, args) => {
      notification(args.success, args.message).show();
      resolve(args);
    });
  });
});
