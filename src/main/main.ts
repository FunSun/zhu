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

// fires when all windows are closed
app.on("window-all-closed", app.quit)
