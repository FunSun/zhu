import { app, BrowserWindow } from "electron"
import { createMainWindow } from "./main-window"
import * as log from "electron-log"
const isDev = true

log.transports.file.level = isDev ? false : "info"
log.transports.console.level = isDev ? "debug" : false

// usually we'd just use __dirname here, however, the FuseBox
// bundler rewrites that, so we have to get it from Electron.
const appPath = app.getAppPath()

// fires when Electron is ready to start
app.on("ready", () => {
  BrowserWindow.addDevToolsExtension("/home/quanbit/.config/chromium/Profile 1/Extensions/fmkadmapgofadopljbjfkapdkoienihi/3.2.3_0")  
  BrowserWindow.addDevToolsExtension("/home/quanbit/.config/chromium/Profile 2/Extensions/pfgnfdagidkfgccljigdamigbcnndkod/0.9.19_0")
  createMainWindow(appPath) as any
})

// fires when all windows are closed
app.on("window-all-closed", app.quit)
