// logger as a builtin
import {replaceConsoleLog, wait} from './lib/logger'
replaceConsoleLog()

import { app } from "electron"
import * as settings from './setting'
import * as store from './store'
import * as server from './server'
import * as mainWindow from "./main-window"

async function main() {
  logger("main").info("start main")
  await settings.init()
  await store.init()
  await server.init()
  await wait(1000)
  logger("main").info("prepare launch window")
  await mainWindow.init()
}

app.on("ready", () => {
  main().catch((err) => {logger("main").warn(err)})
})

enum QuitStatus {
  PrepareQuit,
  HandleQuit,
  CanQuit
}
let quitStatus:QuitStatus = QuitStatus.PrepareQuit

app.on("before-quit", (e) => {
  if (quitStatus === QuitStatus.CanQuit) {
    logger("main").info("quit")
    return
  }
  e.preventDefault()
  if (quitStatus == QuitStatus.HandleQuit) {
    logger("main").info("extra quit request")
    return
  }
  
  quitStatus = QuitStatus.HandleQuit
  logger("main").info("graceful quit start")  
  store.getStore().then((s) => {return s.lastSync()}).then(() => {
    logger("main").info("graceful quit finished")
    quitStatus = QuitStatus.CanQuit
    app.quit()
  })
})
 