import { observable, action } from 'mobx'

export default class UIStore {
    @observable addBlogModalVisible: boolean = false
    
    @action
    showAddBlogModal() {
        this.addBlogModalVisible = true
    }

    @action
    hideAddBlogModal() {
        this.addBlogModalVisible = false        
    }
}