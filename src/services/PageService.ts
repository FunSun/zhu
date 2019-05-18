import * as crypto from 'crypto'
import * as _ from 'lodash'
import KVService,{Doc} from './KVService'
import SearchService from './SearchService'

export interface Block {
    type: string
    data: any
}

export interface Page {
    id: string
    blocks: Block[]
    created: Date
    modified: Date
}

function genUUID(): string {
    return hashCode(Date.now().toString())
}

function hashCode(s: string): string {
    return crypto.createHash('md5').update(s).digest('base64')
}

function docToPage(doc:Doc):Page {
    let page:Page = {
        id: doc.id,
        created: new Date(doc.created),
        modified: new Date(doc.modified),
        blocks: doc.blocks as Block[]
    }
    return page
}

function pageToDoc(page:Page):Doc {
    return {
        id: page.id,
        type: 'page',
        blocks: page.blocks,
        created: page.created.toISOString(),
        modified:page.modified.toISOString()
    }
}

function checkBlock(block: any) {
    let keys = _.keys(block)
    if (keys.length !== 2) {
        throw "block check fail"
    }
    if (_.indexOf(keys, 'type') < 0) {
        throw "block check fail"
    }
    if (_.indexOf(keys, 'data') < 0) {
        throw "block check fail"
    }
}

function getFullText(page: Page): string {
    return JSON.stringify(page.blocks).replace(/[{}\[\]",]/, " ")
}

function getTags(page:Page):string[] {
    return _.flatMap(
        _.filter(page.blocks, (block)=> {return block.type === 'tags'}),
        (block) => {return block.data as string[]}
    )
}

export default class PageService {
    ids:string[] = []

    constructor(private kvSvc:KVService, private schSvc:SearchService) {}
    
    async init() {
        let docs = await this.kvSvc.getAllByType("page")
        let pages = _.map(docs, docToPage)
        pages = _.reverse(_.sortBy(pages, (page) => {return page.modified}))
        _.each(pages, (page) => {
            this.schSvc.add(page.id, getFullText(page), getTags(page))
        })
        this.ids = _.map(pages, (page)=> {return page.id})
    }

    async add(blocks: Block[]):Promise<Page> {
        _.each(blocks, checkBlock)
        let now = new Date()
        let page:Page = {
            id: genUUID(),
            blocks: blocks,
            created: now,
            modified: now,
        }
        await this.kvSvc.add(pageToDoc(page))
        await this.schSvc.add(page.id, getFullText(page), getTags(page))
        this.ids.unshift(page.id)
        return page
    }

    async update(id:string, blocks:Block[]):Promise<Page> {
        _.each(blocks, checkBlock)
        let now = new Date()
        let doc = await this.kvSvc.get(id)
        let page = docToPage(doc)
        page.modified = now
        page.blocks = blocks
        await this.kvSvc.update(pageToDoc(page))
        await this.schSvc.update(page.id, getFullText(page), getTags(page))
        let ids = _.filter(this.ids, (o)=> {return o !== id})
        ids.unshift(page.id)
        this.ids = ids
        return page
    }

    async delete(id:string) {
        await this.kvSvc.delete(id)
        await this.schSvc.delete(id)
        this.ids = _.filter(this.ids, (o)=> {return o !== id})
    }

    async getRecommend(offset: number, limit: number): Promise<Page[]> {
        let shuffled = _.shuffle(this.ids)
        let docs = await this.kvSvc.getMany(shuffled.slice(0, limit))
        return _.map(docs, docToPage)
    }

    async search(query:string, offset:number, limit:number) {
        let ids = await this.schSvc.search(query, [])
        let docs = await this.kvSvc.getMany(ids.slice(offset, offset+limit))
        return _.map(docs, docToPage)
    }
}