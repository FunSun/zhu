// This is the entry point for the renderer process.
import * as ReactDOM from 'react-dom'
import React from 'react'

// default 
function preset() {
    // set global var
    (window as any).React = React

    // Zooming resets
    
    // Drag and drop resets
    document.addEventListener("dragover", event => event.preventDefault())
    document.addEventListener("drop", event => event.preventDefault())
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
