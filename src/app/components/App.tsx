import * as React from "react"
import ResourceList from './ResourceList'
import AddBlogModal from './AddBlogModal'
import AddCommentModal from './AddCommentModal'
import EditTagModal from './EditTagModal'
import AddArticleModal from './ArticleEditor'
import ArticleView from './ArticleView'
import AppBar from './AppBar'

import { css } from 'glamor'

let appStyle = css({
    width:'100%',
    minHeight: '1000px',
    backgroundColor: '#efefef'
})

export default class App extends React.Component {
    render() {
        return (<div {...appStyle} >
            <AppBar></AppBar>
            <ResourceList></ResourceList>
            <AddBlogModal></AddBlogModal>
            <AddCommentModal></AddCommentModal>
            <EditTagModal></EditTagModal>
            <AddArticleModal></AddArticleModal>
            <ArticleView></ArticleView>
        </div>)
    }
}