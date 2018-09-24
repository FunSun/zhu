const { app, BrowserWindow } = require("electron")
import { join } from "path"
import { format } from "url"

// default dimensions
export const DIMENSIONS = { width: 1920, height: 800, minWidth: 1920, minHeight: 800 }

/**
 * Creates the main window.
 *
 * @param appPath The path to the bundle root.
 * @param showDelay How long in ms before showing the window after the renderer is ready.
 * @return The main BrowserWindow.
 */
export function createMainWindow(appPath: string, showDelay: number = 100) {

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
    transparent: true,
    title: app.getName(),
    webPreferences: {
      backgroundThrottling: false,
      textAreasAreResizable: false,
    },
  })

  window.maximize()  
  window.loadURL(
    format({
      pathname: join(appPath, "build/index.html"),
      protocol: "file:",
      slashes: true,
    }),
  )
  window.loadURL(appPath)
  window.show()
  window.focus()

  return window
}
