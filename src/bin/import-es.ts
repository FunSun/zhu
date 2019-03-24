// logger as a builtin
import {replaceConsoleLog} from '../main/lib/logger'

replaceConsoleLog()


import {Store} from '../main/store'
import {Link, Tag, PageX} from '../main/models'
import * as fs from 'fs'
import * as _ from 'lodash'
let raw = fs.readFileSync("./zhu-server.json", "utf8").toString()

let docs:any[] = []
_.each(_.split(raw, '\n'), (row) => {
    if (row.length === 0) {
        return
    }
    docs.push(JSON.parse(row))
})

async function main() {
    let store = new Store()
    await store.init()
    
    for (let i=0; i < docs.length; i++) {
        let doc = docs[i]
        let id = doc._id as string
        let source = doc._source as any
        let pagex = null
        switch(source.type as string) {
            case 'link':
            case 'zhihu':
            case 'blog':
                let link = new Link(id, source.title, source.from, source.favicon)
                link.created = new Date(source.created)
                link.tags = _.map(source.tags as string[], (tag) => {return new Tag(tag)})
                await store.addLink(link)
                break
            case 'snippet':
            case 'comment':
                pagex = new PageX(id, source.content)
                pagex.created = new Date(source.created)
                pagex.tags = _.map(source.tags as string[], (tag) => {return new Tag(tag)})
                await store.addPageX(pagex)
                break
            case 'article':
                pagex = new PageX(id, source.title + "\n" + source.content)
                pagex.created = new Date(source.created)
                pagex.tags = _.map(source.tags as string[], (tag) => {return new Tag(tag)})
                await store.addPageX(pagex)
                break
            default:
                logger("importer").info("not supported type: ", source.type)
        }
    }
}

main().catch((e) => {console.log(e)})