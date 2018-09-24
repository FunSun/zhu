import * as ReactDOM from 'react-dom'
import * as React from 'react'
import { configure } from 'mobx'
import { Provider } from 'mobx-react'

import App from './components/App'

import stores from './stores'

configure({
    enforceActions: "observed"
})

export function runApp () {
    ReactDOM.render((
        <Provider {...stores}>
            <App />
        </Provider>
      ), document.getElementById('root'))
}