import {createContext, useContext} from 'react'
import { observable, action, flow, extendObservable } from 'mobx'
import * as _ from 'lodash'
import {invokeRPC, notify} from './basic'

export interface Resource {
    id: string
}

async function queryResource(query: string, offset: number, limit:number) {
    if (query.length === 0) {
        return await invokeRPC("page.getRecommend", 0, limit)
    }
    return await invokeRPC("page.search", query, offset, limit)
}

export class ResourceStore {
    @observable resources:any[] = []
    @observable query: string = ""
    offset: number

    constructor() {
        this.reload()
    }

    @action
    addTagToQuery(tag: string):void {
        let trunks = _.split(this.query, ' ')
        let exist = false
        trunks = _.map(trunks, (trunk) => {
            if (_.startsWith(trunk, 'tags:')) {
                exist = true
                return trunk + ',' + tag
            }
            return trunk
        })
        if (!exist) {
            trunks.push("tags:" + tag)
        }
        this.query = trunks.join(" ")
    }

    @action
    updateQuery(query: string) {
        this.query = query
    }

    @action
    toggle(id: string) {

        let target = _.find(this.resources, (o) => {return o.id === id})
        if (target.expanded === undefined) {
            extendObservable(target, {
                expanded: false
            })
        }
        target["expanded"] = !target["expanded"]
    }
        
    reload = flow(function * reload ():any {
        try {
            let res = yield queryResource(this.query, 0, 24)
            this.resources.replace(res)
            this.offset = this.resources.length
            notify.info("加载成功")
        } catch(err) {
            notify.warn("加载失败")
            console.log(err)
        }
    })

    loadMore = flow(function * loadMore():any {
        try {
            let res = yield queryResource(this.query, this.offset, 24)
            this.resources.replace(_.unionWith(this.resources, res, (a:any, b:any) => {
                return a.id === b.id
            }))
            this.offset = this.resources.length
            notify.info("加载成功")
        } catch(err) {
            notify.warn("加载失败")    
            console.log(err)
        }
    })

    deleteResource = flow(function *deleteResource(id:string):any {
        try {
            yield invokeRPC("deleteResource", id)
            this.resources.replace(_.filter(this.resources, (o) => {
                return o.id !== id
            }))
            notify.info("删除成功")
        } catch(err) {
            notify.warn("删除失败")
            console.log(err)
        }
    })
}

let store = new ResourceStore()
export {store}
let ctx = createContext(store)
export default function () { return useContext(ctx)}

