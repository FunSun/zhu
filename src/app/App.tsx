import * as React from "react"
import {createStyles, withStyles, WithStyles} from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'

import {
    BindedAppBar,
    BindedBackupModal,
    BindedConfirmAlert,
    BindedEditTagModal,
    BindedNotificationManager,
    BindedResouceList,
    BindedSettingModal,
    BindedSnippetModal
} from './bindings'

let styles = createStyles({
    root: {
        width:'100%',
        backgroundColor: '#efefef',
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
                <BindedBackupModal></BindedBackupModal>
                <BindedSettingModal></BindedSettingModal>
                <BindedEditTagModal></BindedEditTagModal>
                <BindedSnippetModal></BindedSnippetModal>
            </div>
            <BindedNotificationManager></BindedNotificationManager>
            <BindedConfirmAlert></BindedConfirmAlert>
        </div>
    </React.Fragment>)
})