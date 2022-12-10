const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electron", {
  on: (channel, listener) => ipcRenderer.on(channel, listener),
  send: (channel, ...args) => ipcRenderer.send(channel, args),
  invoke: (channel, ...args) => ipcRenderer.invoke(channel, args),
});
