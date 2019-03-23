import { app, BrowserWindow } from "electron"
import { createMainWindow } from "./main-window"
import * as log from "electron-log"
const isDev = true
import {join} from 'path'
import * as store from './store'
import * as server from './server'
import * as settings from './setting'

log.transports.file.level = isDev ? false : "info"
log.transports.console.level = isDev ? "debug" : false

// usually we'd just use __dirname here, however, the FuseBox
// bundler rewrites that, so we have to get it from Electron.
const appPath = app.getAppPath()

settings.init()

app.on("ready", () => {
  logger("app").info("app ready")  
  store.init().then(() => {
    return server.init()
  }).then(() => {
    logger("main").info("prepare launch window")
    if (process.env["PLUGIN"] === 'withplugin'){
      BrowserWindow.addDevToolsExtension(join(process.cwd(), "extensions/react"))
      BrowserWindow.addDevToolsExtension(join(process.cwd(), "extensions/mobx"))
    }
    createMainWindow(appPath) as any    
  }).catch((err) => {
    logger("main").warn(err)
  })
  
})

// fires when all windows are closed
app.on("window-all-closed", app.quit)


