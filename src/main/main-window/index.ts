const { app, BrowserWindow } = require("electron")
import { join, dirname } from "path"
import { format } from "url"

// default dimensions
export const DIMENSIONS = { width: 600, height: 400, minWidth: 600, minHeight: 400 }

export async function init() {

  // create our main window
  const window = new BrowserWindow({
    minWidth: DIMENSIONS.minWidth,
    minHeight: DIMENSIONS.minHeight,
    width: DIMENSIONS.width,
    height: DIMENSIONS.height,
    x: 0,
    y: 0,
    show: false,
    useContentSize: true,
    titleBarStyle: "hiddenInset",
    autoHideMenuBar: true,
    // backgroundColor: '#fff',
    vibrancy: "light",
    transparent: false,
    title: app.getName(),
    webPreferences: {
      backgroundThrottling: false,
      textAreasAreResizable: false,
    },
  })


  if (process.env["PLUGIN"] === 'withplugin'){
    // BrowserWindow.addDevToolsExtension(join(process.cwd(), "extensions/react"))
    // BrowserWindow.addDevToolsExtension(join(process.cwd(), "extensions/mobx"))
  }

  window.maximize()  
  let target = format({
    pathname: join(dirname(require.main.filename), "index.html"),
    protocol: "file:",
    slashes: true,
  })
  logger("window").info(target)
  window.loadURL(target)
   window.show()
  window.focus()

  return window
}
