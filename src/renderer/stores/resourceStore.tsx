import { observable, action, flow } from 'mobx'
import * as _ from 'lodash'
import {invokeRPC, notify} from './common'

export interface Resource {
    id: string
}

async function queryResource(query: string, offset: number, limit:number) {
    if (query.length === 0) {
        return await invokeRPC("randomSearch", limit)
    }
    if (_.startsWith(query, "type:")) {
        return await invokeRPC("findByType", query.slice(5), offset, limit)
    }
    return await invokeRPC("search", query, offset, limit)
}

export default class ResourceStore {
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
            yield invokeRPC("delteResource", id)
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
