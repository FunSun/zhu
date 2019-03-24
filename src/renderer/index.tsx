// This is the entry point for the renderer process.
import { webFrame, shell, remote } from "electron"
import * as ReactDOM from 'react-dom'
import * as React from 'react'

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
import { Provider } from 'mobx-react'
import { configure } from 'mobx'
import stores from './stores'
configure({
    enforceActions: "observed"
})

// keybindings
import { bind } from 'mousetrap'
bind("alt+s", () => {
    stores.snippetStore.showSnippetModal()
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
        <Provider {...stores}>
            <ThemeProvider theme={muiTheme}>         
            <App />
            </ThemeProvider>
        </Provider>
      ), document.getElementById('root'))
}
runApp()