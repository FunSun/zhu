import { app, BrowserWindow } from "electron"
import { createMainWindow } from "./main-window"
import {join} from 'path'
import * as store from './store'
import * as server from './server'
import * as settings from './setting'

settings.init()

app.on("ready", () => {
  logger("app").info("app ready")  
  store.init().then(() => {
    return server.init()
  }).then(() => {
    return new Promise((receive, reject) => {
      setTimeout(() => {receive()}, 1000)
    })
  }).then(() => {
    logger("main").info("prepare launch window")
    if (process.env["PLUGIN"] === 'withplugin'){
      // BrowserWindow.addDevToolsExtension(join(process.cwd(), "extensions/react"))
      // BrowserWindow.addDevToolsExtension(join(process.cwd(), "extensions/mobx"))
    }
    createMainWindow() as any    
  }).catch((err) => {
    logger("main").warn(err)
  })
  
})

// fires when all windows are closed
app.on("window-all-closed", app.quit)


