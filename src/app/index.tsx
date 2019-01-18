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



import App from './components/App'

import stores from './stores'

bind("alt+s", () => {
    stores.uiStore.showSnippetModal()
})

configure({
    enforceActions: "observed"
})

export function runApp () {
    ReactDOM.render((
        <Provider {...stores}>
            <ThemeProvider theme={muiTheme}>         
            <App />
            </ThemeProvider>
        </Provider>
      ), document.getElementById('root'))
}
