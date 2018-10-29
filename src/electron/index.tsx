// This is the entry point for the renderer process.
//
// Here we disable a few electron settings and mount the root component.
import { webFrame, shell } from "electron"
import {defaultSetting} from '../app/lib/settings'

// default setting
defaultSetting("safeMode", false)
defaultSetting("server", "http://localhost:8070")
defaultSetting("keybindings", "default")

let glb = (global as any)
glb.clipboard = require('electron').clipboard as any

/**
 * Zooming resets
 */
webFrame.setVisualZoomLevelLimits(1, 1)
webFrame.setLayoutZoomLevelLimits(0, 0)

/**
 * Drag and drop resets
 */
document.addEventListener("dragover", event => event.preventDefault())
document.addEventListener("drop", event => event.preventDefault())
document.addEventListener('click', function (event:any) {
  if (event.target.tagName === 'A' && event.target.href.startsWith('http')) {
    event.preventDefault()
    shell.openExternal(event.target.href)
  }
})

import { runApp } from '../app'
// 平台无关部分(无论是electron还是browser都一样)
runApp()
