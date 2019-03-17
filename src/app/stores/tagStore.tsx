import { observable, action, flow } from 'mobx'
import * as _ from 'lodash'
import axios from 'axios'

import BasicStore from './basicStore'

export default class SnippetStore {
    @observable editTagModalBuffer: any = {id: "", tags: []}
    @observable editTagModalVisible: boolean = false

    bs: BasicStore

    constructor(bs: BasicStore) {
        this.bs = bs
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

    updateTags = flow(function * updateTags(id: string, tags: string[]):any {
        try {
            let body = {id, tags}
            let res = yield axios.post(this.bs.server + '/resources/tags', body)
            this.bs.notify("更新成功")
            let target = _.find(this.resources, {id}) as any
            target.tags.replace(tags)
            // connecting elemtn only react to this.resource, not this.resource[n].tags
            // so we need this method to force update
            this.resources.replace(this.resources) 
        } catch(err) {
            this.bs.notify("更新失败", "error")    
            console.log(err)
        }
    })
}