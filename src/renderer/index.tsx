// This is the entry point for the renderer process.
//
// Here we disable a few electron settings and mount the root component.
import { webFrame, shell } from "electron"
import {defaultSetting} from './lib/settings'

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




import * as ReactDOM from 'react-dom'
import * as React from 'react'
import { configure } from 'mobx'
import { Provider } from 'mobx-react'
import { ThemeProvider } from '@material-ui/styles'

import { createMuiTheme} from '@material-ui/core/styles'

import { bind } from 'mousetrap'

const muiTheme = createMuiTheme({
    typography: {
        useNextVariants: false,
        suppressDeprecationWarnings: true,
        fontFamily: [
            '"Helvetica Neue"',
            '"Hiragino Sans GB"',
            'Arial',
            'sans-serif',
        ].join(',')
    }
})



import App from './App'

import stores from './stores'

bind("alt+s", () => {
    stores.snippetStore.showSnippetModal()
})

configure({
    enforceActions: "observed"
})

function runApp () {
    ReactDOM.render((
        <Provider {...stores}>
            <ThemeProvider theme={muiTheme}>         
            <App />
            </ThemeProvider>
        </Provider>
      ), document.getElementById('root'))
}

runApp()