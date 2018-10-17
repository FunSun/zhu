import { observable, action, flow } from 'mobx'
import axios from 'axios'
import * as _ from 'lodash'

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
            let query = (this.query.length > 0)?this.query: "random"
            let res = yield axios.get(encodeURI(`http://localhost:8070/resources/search?q=${query}`))
            this.resources.replace(res.data)
            this.offset = res.data.length
        } catch(err) {
            console.log(err)
        }
    })

    loadMore = flow(function * loadMore():any {
        try {
            let query = (this.query.length > 0)?this.query: "random"
            let res = yield axios.get(encodeURI(`http://localhost:8070/resources/search?q=${query}&offset=${this.offset}`))
            this.resources.push(...res.data)
            this.offset += res.data.length
        } catch(err) {
            console.log(err)
        }
    })

    addBlog = flow(function * addBlog(blog: Blog): any {
        try {
            let body = [blog.from, blog.title, blog.tags.join("\n"), blog.content].join("\n")
            yield axios.post('http://localhost:8070/resources/blog', body)
        } catch(err) {
            console.log(err)
        }
    })

    addComment = flow(function * addComment(content:string): any {
        try {
            let body = {
                content: content
            }
            yield axios.post('http://localhost:8070/resources/comment', body)
        } catch(err) {
            console.log(err)
        }
    })

    addArticle = flow(function * addArticle(content:string): any {
        try {
            let body = {
                    title: "",
                    content: content
            }
            yield axios.post('http://localhost:8070/resources/article', body)
        } catch(err) {
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
            yield axios.post('http://localhost:8070/resources/article', body)
            let res = _.find(this.resources, {id}) as any
            res.content = content
        } catch(err) {
            console.log(err)
        }
    })
    
    updateTags = flow(function * updateTags(id: string, tags: string[]):any {
        try {
            let body = {id, tags}
            let res = yield axios.post('http://localhost:8070/resources/tags', body)
        } catch(err) {
            console.log(err)
        }
    })
}
