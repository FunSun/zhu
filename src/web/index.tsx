// This is the entry point for the renderer process.
//
// Here we disable a few electron settings and mount the root component.
import { css } from "glamor"
import {defaultSetting} from '../app/lib/settings'

import { runApp } from '../app'

/**
 * CSS reset
 */
import "glamor/reset"

// default setting
defaultSetting("safeMode", false)
defaultSetting("server", "")
defaultSetting("keybindings", "default")

/**
 * Electron-focused CSS resets
 */
css.global("html, body", {})

/**
 * Drag and drop resets
 */
document.addEventListener("dragover", event => event.preventDefault())
document.addEventListener("drop", event => event.preventDefault())

// 平台无关部分(无论是electron还是browser都一样)
runApp()
