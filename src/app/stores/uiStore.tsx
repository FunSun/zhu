import { observable, action } from 'mobx'

export default class UIStore {
    @observable addBlogModalVisible: boolean = false
    @observable editTagModalVisible: boolean = false
    @observable addCommentModalVisible: boolean = false    
    @observable editTagModalBuffer: any = {id: "", tags: []}
    
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
}