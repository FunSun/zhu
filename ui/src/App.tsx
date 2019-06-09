import * as React from "react"
import {createStyles, withStyles, WithStyles} from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'

import {
    BindedAppBar,
    BindedConfirmAlert,
    BindedNotificationManager,
    BindedResouceList,
    BindedSnippetModal
} from './bindings'

let styles = createStyles({
    root: {
        width:'100%',
        backgroundColor: '#ffffff',
    }
})

export default withStyles(styles)((props: WithStyles<typeof styles>) => {
    return (<React.Fragment>
        <CssBaseline/>
        <div className={props.classes.root}>
            <div>
                <BindedAppBar></BindedAppBar>
                <BindedResouceList></BindedResouceList>
            </div>
            <div>
                <BindedSnippetModal></BindedSnippetModal>
            </div>
            <BindedNotificationManager></BindedNotificationManager>
            <BindedConfirmAlert></BindedConfirmAlert>
        </div>
    </React.Fragment>)
})