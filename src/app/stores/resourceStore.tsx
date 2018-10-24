import { observable, action, flow } from 'mobx'
import axios from 'axios'
import * as _ from 'lodash'
import UIStore from './uiStore'
import SettingStore from './settingStore'

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
    @observable resources:any = []
    @observable query: string = ""
    us: UIStore
    ss: SettingStore
    offset: number

    constructor(us: UIStore, ss: SettingStore) {
        this.us = us
        this.ss = ss
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
            let res = yield axios.get(encodeURI(this.ss.server + `/resources/search?q=${query}`))
            this.resources.replace(res.data)
            this.offset = this.resources.length
            this.us.notify("加载成功")
        } catch(err) {
            this.us.notify("加载失败")
            console.log(err)
        }
    })

    loadMore = flow(function * loadMore():any {
        try {
            let query = (this.query.length > 0)?this.query: "_random"
            query = this.processSafeMode(query)
            let res = yield axios.get(encodeURI(this.ss.server + `/resources/search?q=${query}&offset=${this.offset}`))
            this.resources.replace(_.unionWith(this.resources, res.data, (a:any, b:any) => {
                return a.id === b.id
            }))
            this.offset = this.resources.length
            this.us.notify("加载成功")
        } catch(err) {
            this.us.notify("加载失败")    
            console.log(err)
        }
    })

    addBlog = flow(function * addBlog(blog: Blog): any {
        try {
            let body = [blog.from, blog.title, blog.tags.join("\n"), blog.content].join("\n")
            yield axios.post(this.ss.server + '/resources/blog', body)
        } catch(err) {
            console.log(err)
        }
    })

    addComment = flow(function * addComment(content:string): any {
        try {
            let body = {
                content: content
            }
            yield axios.post(this.ss.server + '/resources/comment', body)
            this.us.notify("添加成功")
        } catch(err) {
            this.us.notify("添加失败", "error")    
            console.log(err)
        }
    })

    addArticle = flow(function * addArticle(content:string): any {
        try {
            let body = {
                    title: "",
                    content: content
            }
            yield axios.post(this.ss.server + '/resources/article', body)
            this.us.notify("添加成功")
        } catch(err) {
            this.us.notify("添加失败", "error")
            console.log(err)
        }
    })

    updateArticle = flow(function * updateArticle(id:string, content:string): any {
        try {
            let body = {
                    id: id,
                    title: "",
                    content: content
            }
            yield axios.post(this.ss.server + '/resources/article', body)
            let res = _.find(this.resources, {id}) as any
            res.content = content
            this.us.notify("添加成功")
        } catch(err) {
            this.us.notify("添加失败", "error")    
            console.log(err)
        }
    })
    
    updateTags = flow(function * updateTags(id: string, tags: string[]):any {
        try {
            let body = {id, tags}
            let res = yield axios.post(this.ss.server + '/resources/tags', body)
            this.us.notify("更新成功")
            let target = _.find(this.resources, {id}) as any
            target.tags.replace(tags)
            // connecting elemtn only react to this.resource, not this.resource[n].tags
            // so we need this method to force update
            this.resources.replace(this.resources) 
        } catch(err) {
            this.us.notify("更新失败", "error")    
            console.log(err)
        }
    })

    deleteResource = flow(function *deleteResource(id:string):any {
        try {
            let res = yield axios.delete(this.ss.server + '/resources?id=' + encodeURIComponent(id))
            
            this.resources.replace(_.filter(this.resources, (o) => {
                return o.id !== id
            }))
            this.us.notify("删除成功", "info")
        } catch(err) {
            this.us.notify("删除失败", "error")
            console.log(err)
        }
    })

    processSafeMode(q: string) {
        if (!this.ss.safeMode && !_.includes(q, '_safe')) {
            q += " _safe"
        }
        return q
    }
}
