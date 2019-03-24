const { app, BrowserWindow } = require("electron")
import { join, dirname } from "path"
import { format } from "url"

// default dimensions
export const DIMENSIONS = { width: 600, height: 400, minWidth: 600, minHeight: 400 }

/**
 * Creates the main window.
 *
 * @param appPath The path to the bundle root.
 * @param showDelay How long in ms before showing the window after the renderer is ready.
 * @return The main BrowserWindow.
 */
export function createMainWindow(showDelay: number = 100) {

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
