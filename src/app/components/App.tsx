import * as React from "react"
import {
    BindingArticleEditor,
    BindingAppBar,
    BindingResourceList,
    BindingAddBlogModal,
    BindingAddCommentModal,
    BindingArticleView,
    BindingEditTagModal,
    BindingNotificationManager,
    BindingDeleteAlert,
    BindingBlogView
} from './bindings'
import { css } from 'glamor'
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles'

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

let appStyle = css({
    width:'100%',
    minHeight: '1000px',
    backgroundColor: '#efefef',
    'WebkitUserSelect': 'text'
})

export default class App extends React.Component {
    render() {
        return (<MuiThemeProvider theme={muiTheme}> <div {...appStyle} >
            <div>
                <BindingAppBar></BindingAppBar>
                <BindingResourceList></BindingResourceList>
            </div>
            <div>
                <BindingAddBlogModal></BindingAddBlogModal>
                <BindingAddCommentModal></BindingAddCommentModal>
                <BindingEditTagModal></BindingEditTagModal>
                <BindingArticleEditor></BindingArticleEditor>
                <BindingArticleView></BindingArticleView>
                <BindingBlogView></BindingBlogView>
            </div>
            <BindingNotificationManager></BindingNotificationManager>
            <BindingDeleteAlert></BindingDeleteAlert>
        </div></MuiThemeProvider>)
    }
}