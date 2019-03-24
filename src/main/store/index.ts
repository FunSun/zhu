import * as PouchDB from 'pouchdb'
import * as flexsearch from  'flexsearch'
import {Tag, PageX, Link} from '../models'
import * as PouchdbFind from 'pouchdb-find'
import * as _ from 'lodash'
import * as settings from '../setting'

PouchDB.plugin(PouchdbFind)
PouchDB.plugin(require('pouchdb-authentication'))

enum SyncStatus {
    NoSync,
    Syncing,
    SyncBroken
}

function getFullText(doc: any): string {
    let type = doc.type as string
    switch(type) {
        case 'link':
        return doc.title as string
        case 'pagex':
        return doc.content as string
    }
    return ""
}

export class Store {
        db: PouchDB.Database
        idx: flexsearch.Index
        syncStatus: SyncStatus = SyncStatus.NoSync

    async init() {
        await this.initDB()
        await this.initIndex()
    }

    async initDB() {
        this.db = new PouchDB(settings.getLocalDB(), {adapter: "leveldb", revs_limit: 10})
        let idxs = await this.db.getIndexes()
        if (idxs.indexes.length === 1) {
            await this.db.createIndex({
                index: {
                    "fields": ["created", "type"]
                }
            })
        }
        await this.syncToRemote()
        logger("store.initDB").info("init succeed")
    }

    async syncToRemote() {
        let remoteDBSetting = settings.getRemoteDB()
        if (!remoteDBSetting) {
            return
        }
        this.syncStatus = SyncStatus.Syncing
        let remoteDB = new PouchDB(remoteDBSetting["addr"]) as any
        let res = await remoteDB.logIn(remoteDBSetting["user"], remoteDBSetting["passwd"])
        logger("store.syncToRemote").debug(res)
        setInterval(() => {
            this.db.sync(remoteDB).
            then(() => {logger("syncing").info("success sync")}).
            catch((err) => {logger("syncing").error(err)})
        }, 20000)
    }

    async initIndex() {
        logger("store.indexIndex").info("start create index.")
        this.idx = flexsearch.create({
            encode: false,
            tokenize: function(str:string){
                return _.filter(str.replace(/([^\x00-\x7F])/g, " $1 ").split(" "), (o) => {return o!=="" && o !== " "})
            },
            async: true
        })
        let docs = await this.db.allDocs({include_docs: true})
        _.each(docs.rows, (row) => {
            let doc = (row.doc as any)
            this.idx.add(row.id, getFullText(doc))
        })
        logger("store.intIndex").info("finish create index.")
    }
    async randomSearch(limit: number): Promise<any[]> {
        let emit = PouchDB.emit
        let res = await this.db.query((doc:any) => {
            if (Math.random() > 0.9) {
                emit("1")
            }
        }, {key: "1", include_docs: true})
        return _.map(_.shuffle(res.rows).slice(0, limit), (row) => {
            let res = row.doc as any
            res.id = row.id
            delete res["_id"]
            delete res["_rev"]
            return res
        })
    }

    async simpleSearch(query:string, offset:number, limit:number): Promise<any> {
        let ids = await this.idx.search(query)
        let res =  await this.db.find({selector: {_id: {$in: ids}}})
        return _.map(res.docs, (doc) => {
            let res = doc as any
            res.id = doc["_id"]
            delete res["_id"]
            delete res["_rev"]
            return res
        })
    }

    async findByType(type: string, offset:number, limit: number) {
        logger("findByType").debug(type)
        let res = await this.db.find({selector: {"type": type, "created": {$gt: null}}, skip:offset, limit:limit, sort: [{"created": "desc"}]})
        return _.map(res.docs, (doc) => {
            let res = doc as any
            res.id = doc["_id"]
            delete res["_id"]
            delete res["_rev"]
            return res
        })
    }
    async updateTags(id: string, tags:Tag[]):Promise<void> {
        let doc = await this.db.get(id)
        let anyDoc = doc as any
        anyDoc.tags = _.map(tags, (tag) => {return tag.name}) 
        await this.db.put(anyDoc)
    }

    async addPageX(pagex: PageX): Promise<void> {
        logger("addPageX").debug(pagex.created)
        await this.db.put({
            _id: pagex.id,
            content: pagex.content,
            created: pagex.created,
            tags: _.map(pagex.tags, (o) => {return o.name}),
            type: "pagex"
        })
        await this.idx.add(pagex.id, pagex.content)
    }
    async updatePageXContent(id: string, content: string):Promise<void> {
        let doc = await this.db.get(id)
        let anyDoc = doc as any
        anyDoc.content = content
        await this.db.put(anyDoc)
        this.idx.update(id, content)
    }
    async deleteResource(id: string):Promise<void> {
        let doc = await this.db.get(id)
        await this.db.remove(doc)
        this.idx.remove(id)
    }

    async linkExist(from: string):Promise<boolean> {
        let res = await this.db.find({selector: {from: from}})
        return res.docs.length > 0
    }

    async addLink(link: Link): Promise<void> {
        await this.db.put({
            _id: link.id,
            from: link.from,
            favicon: link.favicon,
            title: link.title,
            created: link.created,
            tags: _.map(link.tags, (o) => {return o.name}),
            type: "link"
        })
        await this.idx.add(link.id, link.title)
    }
}

let store:Store = null

export async function init() {
    store = new Store()
    await store.init()
}

export async function getStore():Promise<Store> {
    if (store) {
        return store
    }
    await init()
    return store
}