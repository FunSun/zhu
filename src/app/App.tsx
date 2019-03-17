import * as React from "react"
import {createStyles, withStyles, WithStyles} from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'

import {
    BindingArticleEditor,
    BindingAppBar,
    BindingAddCommentModal,
    BindingArticleView,
    BindingEditTagModal,
    BindingNotificationManager,
    BindingConfirmAlert,
    BindingBlogView,
    BindingSettingModal,
    BindingBackupsModal,
    BindedSnippetModal,
    BindedResouceList
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
                <BindingAppBar></BindingAppBar>
                <BindedResouceList></BindedResouceList>
            </div>
            <div>
                <BindingAddCommentModal></BindingAddCommentModal>
                <BindingEditTagModal></BindingEditTagModal>
                <BindingEditTagModal></BindingEditTagModal>                
                <BindingArticleEditor></BindingArticleEditor>
                <BindingArticleView></BindingArticleView>
                <BindingBlogView></BindingBlogView>
                <BindingSettingModal></BindingSettingModal>
                <BindingBackupsModal></BindingBackupsModal>
                <BindedSnippetModal></BindedSnippetModal>
            </div>
            <BindingNotificationManager></BindingNotificationManager>
            <BindingConfirmAlert></BindingConfirmAlert>
        </div>
    </React.Fragment>)
})