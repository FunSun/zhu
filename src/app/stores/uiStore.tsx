import { observable, action } from 'mobx'
import * as _ from 'lodash'

export default class UIStore {
    @observable addBlogModalVisible: boolean = false
    @observable editTagModalVisible: boolean = false
    @observable addCommentModalVisible: boolean = false    
    @observable articleEditorVisible: boolean = false
    @observable confirmAlertVisible: boolean = false
    @observable articleViewVisible: boolean = false
    @observable blogViewVisible: boolean = false    
    @observable editTagModalBuffer: any = {id: "", tags: []}
    @observable articleViewBuffer: any = {content:""}
    @observable blogViewBuffer: any = {content:""}
    @observable notifyBuffer: any = []
    @observable confirmAlertTitle:string = ""
    @observable confirmAlertDesc: string = ""
    @observable confirmAlertAction = ()=>{}
    @observable settingModalVisible: boolean = false
    @observable backupsModalVisible: boolean = false
    @observable snippetModalVisible: boolean = false
    
    @action
    showAddBlogModal() {
        this.addBlogModalVisible = true
    }

    @action
    hideAddBlogModal() {
        this.addBlogModalVisible = false        
    }

    @action
    showEditTagModal(id:string, tags: string[]) {
        this.editTagModalVisible = true
        this.editTagModalBuffer.id = id
        this.editTagModalBuffer.tags = tags
    }

    @action
    hideEditTagModal() {
        this.editTagModalVisible = false        
    }

    @action
    addTag(tag:string) {
        this.editTagModalBuffer.tags.push(tag)
    }
    @action
    removeTag(tag:string) {
        this.editTagModalBuffer.tags.remove(tag)
    }

    @action
    showAddCommentModal() {
        this.addCommentModalVisible = true
    }

    @action
    hideAddCommentModal() {
        this.addCommentModalVisible = false        
    }

    @action
    showArticleEditor() {
        this.articleEditorVisible = true
    }

    @action
    hideArticleEditor() {
        this.articleEditorVisible = false        
    }    

    @action
    showArticleView(resource:any) {
        this.articleViewBuffer.content = resource.content
        this.articleViewVisible = true
    }

    @action
    hideArticleView() {
        this.articleViewVisible = false        
    }    

    @action
    showBlogView(resource:any) {
        this.blogViewBuffer.content = resource.content
        this.blogViewVisible = true
    }

    @action
    hideBlogView() {
        this.blogViewVisible = false
    }

    @action
    notify(msg:string, kind:string='info') {
        this.notifyBuffer = {
            id: Date.now(),
            msg,
            kind
        }
    }

    @action
    showConfirmAlert(title: string, desc: string, action:()=>void) {
        this.confirmAlertVisible = true
        this.confirmAlertTitle = title
        this.confirmAlertDesc = desc
        this.confirmAlertAction = action
    }

    @action
    hideConfirmAlert() {
        this.confirmAlertVisible = false
    }

    @action
    showSettingModal() {
        this.settingModalVisible = true
    }

    @action
    hideSettingModal() {
        this.settingModalVisible = false
    }    

    @action
    showBackupsModal() {
        this.backupsModalVisible = true
    }

    @action
    hideBackupsModal() {
        this.backupsModalVisible = false
    }    

    @action
    showSnippetModal() {
        this.snippetModalVisible = true
    }

    @action
    hideSnippetModal() {
        this.snippetModalVisible = false        
    }

}