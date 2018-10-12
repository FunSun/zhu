import * as React from "react"
import {
    BindingArticleEditor,
    BindingAppBar,
    BindingScrollToBottomDetector, 
    BindingResourceList,
    BindingAddBlogModal,
    BindingAddCommentModal,
    BindingArticleView,
    BindingEditTagModal
} from './bindings'
import { css } from 'glamor'

let appStyle = css({
    width:'100%',
    minHeight: '1000px',
    backgroundColor: '#efefef'
})

export default class App extends React.Component {
    render() {
        return (<div {...appStyle} >
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
            </div>
            <BindingScrollToBottomDetector></BindingScrollToBottomDetector>
        </div>)
    }
}