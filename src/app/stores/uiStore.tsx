import { observable, action } from 'mobx'

export default class UIStore {
    @observable addBlogModalVisible: boolean = false
    @observable editTagModalVisible: boolean = false
    @observable addCommentModalVisible: boolean = false    
    @observable addArticleModalVisible: boolean = false
    @observable articleViewVisible: boolean = false
    @observable editTagModalBuffer: any = {id: "", tags: []}
    @observable articleViewBuffer: any = {title:"", content:""}
    
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
        console.log(id, tags)
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
    showAddArticleModal() {
        this.addArticleModalVisible = true
    }

    @action
    hideAddArticleModal() {
        this.addArticleModalVisible = false        
    }    

    @action
    showArticleView(resource:any) {
        this.articleViewBuffer.title = resource.title
        this.articleViewBuffer.content = resource.content
        this.articleViewVisible = true
    }

    @action
    hideArticleView() {
        this.articleViewVisible = false        
    }    
}