import { observable, action, flow } from 'mobx'
import axios from 'axios'
import * as _ from 'lodash'
import BasicStore from './basicStore'

export interface Resource {
    id: string
}

export interface Blog {
    from: string,
    title: string,
    tags: string[],
    content: string
}

export default class ResourceStore {
    @observable resources:any[] = []
    @observable query: string = ""
    offset: number

    bs: BasicStore

    constructor(bs: BasicStore) {
        this.bs = bs
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
            let query = (this.query.length > 0)?this.query: "_random"
            query = this.processSafeMode(query)            
            let res = yield axios.get(encodeURI(this.bs.server + `/resources/search?q=${query}`))
            this.resources.replace(res.data)
            this.offset = this.resources.length
            this.bs.notify("加载成功")
        } catch(err) {
            this.bs.notify("加载失败")
            console.log(err)
        }
    })

    loadMore = flow(function * loadMore():any {
        try {
            let query = (this.query.length > 0)?this.query: "_random"
            query = this.processSafeMode(query)
            let res = yield axios.get(encodeURI(this.bs.server + `/resources/search?q=${query}&offset=${this.offset}`))
            this.resources.replace(_.unionWith(this.resources, res.data, (a:any, b:any) => {
                return a.id === b.id
            }))
            this.offset = this.resources.length
            this.bs.notify("加载成功")
        } catch(err) {
            this.bs.notify("加载失败")    
            console.log(err)
        }
    })

    addBlog = flow(function * addBlog(blog: Blog): any {
        try {
            let body = [blog.from, blog.title, blog.tags.join("\n"), blog.content].join("\n")
            yield axios.post(this.bs.server + '/resources/blog', body)
        } catch(err) {
            console.log(err)
        }
    })

    addComment = flow(function * addComment(content:string): any {
        try {
            let body = {
                content: content
            }
            yield axios.post(this.bs.server + '/resources/comment', body)
            this.bs.notify("添加成功")
        } catch(err) {
            this.bs.notify("添加失败", "error")    
            console.log(err)
        }
    })

    deleteResource = flow(function *deleteResource(id:string):any {
        try {
            let res = yield axios.delete(this.bs.server + '/resources?id=' + encodeURIComponent(id))
            
            this.resources.replace(_.filter(this.resources, (o) => {
                return o.id !== id
            }))
            this.bs.notify("删除成功", "info")
        } catch(err) {
            this.bs.notify("删除失败", "error")
            console.log(err)
        }
    })

    processSafeMode(q: string) {
        if (!this.bs.safeMode && !_.includes(q, '_safe')) {
            q += " _safe"
        }
        return q
    }
}
