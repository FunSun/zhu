import * as React from "react"
import ResourceStore from "../stores/resourceStore"
import UIStore from "../stores/uiStore"
import SettingStore from '../stores/settingStore'
import { inject, observer } from "mobx-react"

import ArticleEditor from './ArticleEditor'
import ScrollToBottomDetector from "./ScrollToBottomDetector"
import AppBar from './AppBar'
import ResourceList from "./ResourceList"
import AddBlogModal from "./AddBlogModal"
import AddCommentModal from './AddCommentModal'
import ArticleView from './ArticleView'
import BlogView from './BlogView'
import EditTagModal from './EditTagModal'
import NotificationManager from './NotificationManager'
import DeleteAlert from './DeleteAlert'
import SettingModal from './SettingModal'

interface BindingProps {
    uiStore?: UIStore
    resourceStore?: ResourceStore
    settingStore?: SettingStore
    [key:string]:any
}

function bindingHelper(stores:string[], comp:(props:BindingProps)=>React.ReactElement<any>) {
    return inject(...stores)(observer(comp))
}


export const BindingArticleEditor = bindingHelper(["uiStore", "resourceStore", "settingStore"], (props) => {
    let us = props.uiStore
    let rs = props.resourceStore
    let ss = props.settingStore
    return (<ArticleEditor
        rid={us.articleEditorBuffer.id}
        keybindings={ss.keybindings}
        content={us.articleEditorBuffer.content}
        visible={us.articleEditorVisible}
        onAddArticle={rs.addArticle.bind(rs)}
        onUpdateArticle={rs.updateArticle.bind(rs)}
        onClose={us.hideArticleEditor.bind(us)}
    ></ArticleEditor>)
})

export const BindingScrollToBottomDetector = bindingHelper(['resourceStore'], (props) => {
    let rs = props.resourceStore
    return (<ScrollToBottomDetector onScrollToEnd={rs.loadMore.bind(rs)}></ScrollToBottomDetector>)
})

export const BindingAppBar = bindingHelper(['uiStore', 'resourceStore'], (props) => {
    let rs = props.resourceStore
    let us = props.uiStore
    return <AppBar
        query={rs.query}
        onAddIconClicked={us.showSettingModal.bind(us)}
        onCommentIconClicked={us.showAddCommentModal.bind(us)}
        onEditIconClicked={()=>{us.showArticleEditor("", "")}}
        onQueryChange={rs.updateQuery.bind(rs)}
        onSubmit={rs.reload.bind(rs)}
    ></AppBar>
})

export const BindingResourceList = bindingHelper(['uiStore', 'resourceStore'], (props) => {
    let rs = props.resourceStore
    let us = props.uiStore
    // explicit declare dependency on inner structure
    rs.resources.length
    return (<ResourceList
        resources={rs.resources}
        onEditArticle={us.showArticleEditor.bind(us)}
        onShowArticle={us.showArticleView.bind(us)}
        onShowBlog={us.showBlogView.bind(us)}
        onLabel={us.showEditTagModal.bind(us)}
        onTagClicked={rs.addTagToQuery.bind(rs)}
        onScrollToEnd={rs.loadMore.bind(rs)}
        onDelete={us.showDeleteAlert.bind(us)}
    ></ResourceList>)
})

export const BindingAddBlogModal = bindingHelper(['uiStore', 'resourceStore'], (props) => {
    let rs = props.resourceStore
    let us = props.uiStore
    return <AddBlogModal
        visible={us.addBlogModalVisible}
        onClose={us.hideAddBlogModal.bind(us)}
        onSubmit={rs.addBlog.bind(rs)}
    ></AddBlogModal>
})

export const BindingAddCommentModal = bindingHelper(['uiStore', 'resourceStore'], (props) => {
    let rs = props.resourceStore
    let us = props.uiStore
    return <AddCommentModal
        visible={us.addCommentModalVisible}
        onClose={us.hideAddCommentModal.bind(us)}
        onSubmit={rs.addComment.bind(rs)}
    ></AddCommentModal>
})

export const BindingArticleView = bindingHelper(['uiStore'], (props) => {
    let us = props.uiStore
    return <ArticleView
        visible={us.articleViewVisible}
        content={us.articleViewBuffer.content}
        onClose={us.hideArticleView.bind(us)}
    ></ArticleView>
})

export const BindingBlogView = bindingHelper(['uiStore'], (props) => {
    let us = props.uiStore
    return <BlogView
        visible={us.blogViewVisible}
        content={us.blogViewBuffer.content}
        onClose={us.hideBlogView.bind(us)}
    ></BlogView>
})

export const BindingEditTagModal = bindingHelper(['uiStore', 'resourceStore'], (props) => {
    let rs = props.resourceStore
    let us = props.uiStore
    return <EditTagModal
        tags={us.editTagModalBuffer.tags}
        visible={us.editTagModalVisible}
        onClose={us.hideEditTagModal.bind(us)}
        onSubmit={(tags) => {rs.updateTags(us.editTagModalBuffer.id, tags); us.hideEditTagModal()}}
    ></EditTagModal>
})

export const BindingNotificationManager = bindingHelper(['uiStore'], (props) => {
    let us = props.uiStore
    return <NotificationManager {...us.notifyBuffer}></NotificationManager>
})

export const BindingDeleteAlert = bindingHelper(['uiStore', 'resourceStore'], (props) => {
    let us = props.uiStore    
    let rs = props.resourceStore
    return <DeleteAlert 
        visible={us.deleteAlertVisible}
        onDelete={() => {
            rs.deleteResource(us.deleteAlertBuffer)
            us.hideDeleteAlert()
        }}
        onCancel={us.hideDeleteAlert.bind(us)}
    ></DeleteAlert>
})

export const BindingSettingModal = bindingHelper(['uiStore', 'settingStore'], (props) => {
    let ss = props.settingStore
    let us = props.uiStore
    return <SettingModal
        visible={us.settingModalVisible}
        server={ss.server}
        keybindngs={ss.keybindings}
        safeMode={ss.safeMode}
        onServerChange={ss.setServer.bind(ss)}
        onKeybindingChange={ss.setKeybindings.bind(ss)}
        onSafeModeToggle={ss.toggleSafeMode.bind(ss)}
        onClose={us.hideSettingModal.bind(us)}
    ></SettingModal>
})
