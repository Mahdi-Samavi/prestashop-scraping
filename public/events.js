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
  let alias = task.toLowerCase() + ":" + action;

  hiddenWindow.loadURL(
    `file://${path.join(__dirname, "../app/Tasks/" + task + ".js.html")}`
  );

  // Open the DevTools.
  process.env.DEV && hiddenWindow.webContents.openDevTools();

  destroyHrps(alias);

  HRPs[alias] = hiddenWindow;

  return hiddenWindow;
}

ipcMain.on("close", (event, args) => {
  let alias = args[0];
  destroyHrps(alias);
});

function destroyHrps(alias) {
  if (alias in HRPs) {
    HRPs[alias].close();
    delete HRPs[alias];
  }
}

function notification(isSuccess, body) {
  return new Notification({
    icon: path.join(__dirname, "favicon.ico"),
    title: isSuccess ? "Successful operation" : "There is a problem",
    body: body,
  });
}

// ============================ START SETTING ============================ //
ipcMain.handle("setting:getter", async (event, args) => {
  let contents = loadHRP("Setting", "getter").webContents;
  contents.send("getter", args);

  return await new Promise((resolve) => {
    contents.on("ipc-message", (event, channel, args) => resolve(args));
  });
});

ipcMain.handle("setting:setter", async (event, args) => {
  let contents = loadHRP("Setting", "setter").webContents;
  contents.send("setter", args);

  return await new Promise((resolve) => {
    contents.on("ipc-message", (event, channel, args) => resolve(args));
  });
});

ipcMain.handle("setting:edit-all", async (event, args) => {
  let contents = loadHRP("Setting", "edit-all").webContents;
  contents.send("edit-all", args);

  return await new Promise((resolve) => {
    contents.on("ipc-message", (event, channel, args) => {
      notification(args.success, args.message).show();
      resolve(args);
    });
  });
});
// ============================ END SETTING ============================ //

// ============================ START LOG ============================ //
ipcMain.handle("log:get", async (event, args) => {
  let contents = loadHRP("Log", "get").webContents;
  contents.send("get", args);

  return await new Promise((resolve) => {
    contents.on("ipc-message", (event, channel, args) => resolve(args));
  });
});
// ============================ END LOG ============================ //

// ============================ START CRAWL ============================ //
ipcMain.handle("crawl:handle", async (event, args) => {
  let contents = loadHRP("Crawl", "handle").webContents;
  contents.send("handle", args);

  return await new Promise((resolve) => {
    contents.on("ipc-message", (event, channel, args) => {
      notification(args.success, args.message).show();
      resolve(args);
    });
  });
});
// ============================ END CRAWL ============================ //

// ============================ START STORE ============================ //
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
// ============================ END STORE ============================ //

// ============================ START SCHEMA ============================ //
ipcMain.handle("schema:index", async (event, args) => {
  let contents = loadHRP("Schema", "index").webContents;
  contents.send("index", args);

  return await new Promise((resolve) => {
    contents.on("ipc-message", (event, channel, args) => resolve(args));
  });
});

ipcMain.handle("schema:add", async (event, args) => {
  let contents = loadHRP("Schema", "add").webContents;
  contents.send("add", args);

  return await new Promise((resolve) => {
    contents.on("ipc-message", (event, channel, args) => {
      notification(args.success, args.message).show();
      resolve(args);
    });
  });
});

ipcMain.handle("schema:get", async (event, args) => {
  let contents = loadHRP("Schema", "get").webContents;
  contents.send("get", args);

  return await new Promise((resolve) => {
    contents.on("ipc-message", (event, channel, args) => {
      resolve(args);
    });
  });
});

ipcMain.handle("schema:edit", async (event, args) => {
  let contents = loadHRP("Schema", "edit").webContents;
  contents.send("edit", args);

  return await new Promise((resolve) => {
    contents.on("ipc-message", (event, channel, args) => {
      notification(args.success, args.message).show();
      resolve(args);
    });
  });
});

ipcMain.handle("schema:destroy", async (event, args) => {
  let contents = loadHRP("Schema", "destroy").webContents;
  contents.send("destroy", args);

  return await new Promise((resolve) => {
    contents.on("ipc-message", (event, channel, args) => {
      notification(args.success, args.message).show();
      resolve(args);
    });
  });
});
// ============================ END SCHEMA ============================ //

// ============================ START PRODUCT ============================ //
ipcMain.handle("product:index", async (event, args) => {
  let contents = loadHRP("Product", "index").webContents;
  contents.send("index", args);

  return await new Promise((resolve) => {
    contents.on("ipc-message", (event, channel, args) => {
      if (!args.success) notification(false, args.message).show();
      resolve(args);
    });
  });
});

ipcMain.handle("product:create", async (event, args) => {
  let contents = loadHRP("Product", "create").webContents;
  contents.send("create", args);

  return await new Promise((resolve) => {
    contents.on("ipc-message", (event, channel, args) => resolve(args));
  });
});

ipcMain.handle("product:add", async (event, args) => {
  let contents = loadHRP("Product", "add").webContents;
  contents.send("add", args);

  return await new Promise((resolve) => {
    contents.on("ipc-message", (event, channel, args) => {
      notification(args.success, args.message).show();
      resolve(args);
    });
  });
});

ipcMain.handle("product:get", async (event, args) => {
  let contents = loadHRP("Product", "get").webContents;
  contents.send("get", args);

  return await new Promise((resolve) => {
    contents.on("ipc-message", (event, channel, args) => {
      resolve(args);
    });
  });
});

ipcMain.handle("product:edit", async (event, args) => {
  let contents = loadHRP("Product", "edit").webContents;
  contents.send("edit", args);

  return await new Promise((resolve) => {
    contents.on("ipc-message", (event, channel, args) => {
      notification(args.success, args.message).show();
      resolve(args);
    });
  });
});

ipcMain.handle("product:destroy", async (event, args) => {
  let contents = loadHRP("Product", "destroy").webContents;
  contents.send("destroy", args);

  return await new Promise((resolve) => {
    contents.on("ipc-message", (event, channel, args) => {
      notification(args.success, args.message).show();
      resolve(args);
    });
  });
});
// ============================ END PRODUCT ============================ //
