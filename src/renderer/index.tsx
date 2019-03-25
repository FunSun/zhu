// This is the entry point for the renderer process.
import { webFrame, shell, remote } from "electron"
import * as ReactDOM from 'react-dom'
import React from 'react'

// default 
function preset() {
    // set global var
    let glb = (global as any)
    glb.port = remote.getGlobal("port")
    glb.clipboard = require('electron').clipboard as any
    (window as any).React = React

    // Zooming resets
    webFrame.setVisualZoomLevelLimits(1, 1)
    webFrame.setLayoutZoomLevelLimits(0, 0)
    
    // Drag and drop resets
    document.addEventListener("dragover", event => event.preventDefault())
    document.addEventListener("drop", event => event.preventDefault())
    // handle anchor click
    document.addEventListener('click', function (event:any) {
      if (event.target.tagName === 'A' && event.target.href.startsWith('http')) {
        event.preventDefault()
        shell.openExternal(event.target.href)
      }
    })
}
preset()

// store
import { configure } from 'mobx'
configure({
    enforceActions: "observed"
})

// keybindings
import { bind } from 'mousetrap'
import {store as snippetStore} from './stores/snippet'
bind("alt+s", () => {
    snippetStore.showSnippetModal()
})

// theme
import { ThemeProvider } from '@material-ui/styles'
import { createMuiTheme} from '@material-ui/core/styles'
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

// run app
import App from './App'
function runApp () {
    ReactDOM.render((
        <ThemeProvider theme={muiTheme}>
        <App />
        </ThemeProvider>
      ), document.getElementById('root'))
}
runApp()
