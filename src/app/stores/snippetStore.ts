import { observable, action, flow } from 'mobx'
import * as _ from 'lodash'
import axios from 'axios'

import BasicStore from './basicStore'

export default class SnippetStore {
    @observable visible: boolean = false
    @observable content: string = ""
    @observable id: string = ""

    bs: BasicStore

    constructor(bs: BasicStore) {
        this.bs = bs
    }

    @action
    showSnippetModal() {
        this.visible = true
    }

    @action
    hideSnippetModal() {
        this.visible = false
    }

    @action
    editSnippet(id:string, content:string) {
        this.visible = true
        this.id  = id
        this.content = content
    }

    addSnippet = flow(function * addSnippet(content:string, tags: string[]): any {
        try {
            let body = {
                content: content,
                tags: tags
            }
            yield axios.post(this.bs.server + '/resources/snippet', body)
            this.bs.notify("添加成功")
        } catch(err) {
            this.bs.notify("添加失败", "error")    
            console.log(err)
        }
    })
}