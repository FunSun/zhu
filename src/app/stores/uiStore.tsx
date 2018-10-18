import { observable, action } from 'mobx'
import * as _ from 'lodash'

export default class UIStore {
    @observable addBlogModalVisible: boolean = false
    @observable editTagModalVisible: boolean = false
    @observable addCommentModalVisible: boolean = false    
    @observable articleEditorVisible: boolean = false
    @observable deleteAlertVisible: boolean = false
    @observable articleEditorBuffer: any = {id:"", content:""}
    @observable articleViewVisible: boolean = false
    @observable editTagModalBuffer: any = {id: "", tags: []}
    @observable articleViewBuffer: any = {content:""}
    @observable notifyBuffer: any = []
    @observable deleteAlertBuffer = ""
    
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
    showArticleEditor(id?:string, content?:string) {
        if (id) {
            this.articleEditorBuffer.id = id
            this.articleEditorBuffer.content = content
        } else {
            this.articleEditorBuffer.id = ""
            this.articleEditorBuffer.content = ""
        }
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
    notify(msg:string, kind:string='info') {
        this.notifyBuffer = {
            id: Date.now(),
            msg,
            kind
        }
    }

    @action
    showDeleteAlert(id: string) {
        this.deleteAlertVisible = true
        this.deleteAlertBuffer = id
    }

    @action
    hideDeleteAlert() {
        this.deleteAlertVisible = false
    }
}