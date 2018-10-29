import {defaultSetting} from '../app/lib/settings'

// default setting
defaultSetting("safeMode", false)
defaultSetting("server", "")
defaultSetting("keybindings", "default")

/**
 * Drag and drop resets
 */
document.addEventListener("dragover", event => event.preventDefault())
document.addEventListener("drop", event => event.preventDefault())

import { runApp } from '../app'
// 平台无关部分(无论是electron还是browser都一样)
runApp()
