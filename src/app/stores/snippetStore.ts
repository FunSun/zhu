import { observable, action, flow } from 'mobx'
import * as _ from 'lodash'
import axios from 'axios'

import BasicStore from './basicStore'

export default class SnippetStore {
    @observable visible: boolean = false
    @observable content: string = ""
    @observable id: string = ""

    bs: BasicStore
    saved: boolean

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
        if (this.saved) {
            this.id = ""
            this.content = ""
            this.saved = false
        }
    }

    @action
    editSnippet(id:string, content:string) {
        this.visible = true
        this.id  = id
        this.content = content
    }

    submitSnippet = flow(function * addSnippet(content:string, tags: string[]): any {
        if (this.id === "") {
            try {
                let body = {
                    content: content,
                    tags: tags
                }
                let res = yield axios.post(this.bs.server + '/resources/snippet/add', body)
                this.id = res.data.id
                this.bs.notify("添加成功")
            } catch(err) {
                this.bs.notify("添加失败", "error")    
                console.log(err)
            }
        } else {
            try {
                let body = {
                    id: this.id,
                    content: content,
                    tags: tags
                }
                yield axios.post(this.bs.server + '/resources/snippet/update', body)
                this.bs.notify("添加成功")
            } catch(err) {
                this.bs.notify("添加失败", "error")    
                console.log(err)
            }
        }
        this.saved = true
    })
}