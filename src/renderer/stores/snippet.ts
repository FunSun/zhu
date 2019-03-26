import { observable, action, flow } from 'mobx'
import * as _ from 'lodash'
import {createContext, useContext} from 'react'
import {invokeRPC, notify} from './basic'
import {store as rs} from './resource'
import Plain from 'slate-plain-serializer'
import * as slate from 'slate'

export class SnippetStore {
    @observable visible: boolean = false
    @observable content: string = ""
    @observable id: string = ""
    cache:slate.Value = null

    @action
    showSnippetModal() {
        this.visible = true
    }

    updateCache(value: slate.Value) {
        this.cache = value
    }

    @action
    newSnippet() {
        if (this.id !== "") {
            this.id = ""
            this.content = ""
            this.cache = null
        }
        this.visible = true
    }

    @action
    hideSnippetModal() {
        if (this.cache) {
            this.content = Plain.serialize(this.cache)
            this.cache = null
        }
        this.visible = false
    }

    @action
    editSnippet(id:string, content:string) {
        if (this.id !== id) {
            this.id  = id
            this.content = content
            this.cache = null
        }
        this.visible = true
    }

    submitSnippet = flow(function * addSnippet(content:string, tags: string[]): any {
        if (this.id === "") {
            try {
                let res = yield invokeRPC("addPageX", content, tags)
                this.id = res.id
                rs.resources.unshift(res)
                notify.info("添加成功")
            } catch(err) {
                notify.warn("添加失败", "error")
                console.log(err)
            }
        } else {
            try {
                yield invokeRPC("updatePageX", this.id, content, tags)
                notify.info("更新成功")
                let target = _.find(rs.resources, (o) => {return o.id === this.id})
                target.content = content
            } catch(err) {
                notify.warn("添加失败", "error")
                console.log(err)
            }
        }
    })
}

let store = new SnippetStore()
export {store}
let ctx = createContext(store)
export default function () { return useContext(ctx)}
