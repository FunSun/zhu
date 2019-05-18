import { observable, action, flow } from 'mobx'
import * as _ from 'lodash'
import {createContext, useContext} from 'react'
import {invokeRPC, notify} from './basic'
import {store as rs} from './resource'
import Plain from 'slate-plain-serializer'
import * as slate from 'slate'
import {parse, stringify} from '../lib/pagex'

function trimBlock(block: any):any {
    return {
        'type': block.type,
        'data': block.data
    }
}

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
    editSnippet(id:string, blocks:any[]) {
        if (this.id !== id) {
            this.id  = id
            this.content = stringify(blocks)
            this.cache = null
        }
        this.visible = true
    }

    submitSnippet = flow(function * addSnippet(content:string): any {
        let blocks = _.map(parse(content), trimBlock)
        if (this.id === "") {
            try {
                let res = yield invokeRPC("page.add", blocks)
                this.id = res.id
                rs.resources.unshift(res)
                notify.info("添加成功")
            } catch(err) {
                notify.warn("添加失败", "error")
                console.log(err)
            }
        } else {
            try {
                yield invokeRPC("page.update", this.id, blocks)
                notify.info("更新成功")
                let target = _.find(rs.resources, (o) => {return o.id === this.id})
                target.blocks.replace(blocks)
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
