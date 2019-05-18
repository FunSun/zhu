import ConfigService from './ConfigSerivce'

import * as _ from 'lodash'
import * as PouchDB from 'pouchdb'
import * as PouchdbFind from 'pouchdb-find'
PouchDB.plugin(PouchdbFind)
PouchDB.plugin(require('pouchdb-authentication'))

const log = logger("KVService")

export const ErrNotFound = new Error("not found")

export interface Doc {
    id: string
    type: string
    [key:string]:any
}

function toDoc(row:any) {
    let doc = row as Doc
    doc.id = doc["_id"]
    delete doc["_id"]
    delete doc["_rev"]
    return doc
}

function fromDoc(doc:Doc):any {
    let res = doc as any
    res["_id"] = doc.id
    delete doc.id
    return res
}

export default class KVService {
    db: PouchDB.Database
    remoteDB: any
    isQuit:boolean

    constructor(private confSvc: ConfigService) {}

    public async init() {
        this.db = new PouchDB(this.confSvc.getConf("local-db"), {adapter: "leveldb", revs_limit: 10})
        await this.beginSync()
    }

    public async get(id: string):Promise<Doc> {
        try {
            let doc = (await this.db.get(id)) as Doc
            doc["id"] = doc._id
            delete doc["_id"]
            delete doc["_rev"]
            return doc
        } catch(err) {
            if (err.message && err.message === "missing") {
                throw ErrNotFound
            }
            throw err
        }
    }

    public async getMany(ids:string[]):Promise<Doc[]> {
        let res =  await this.db.find({selector: {_id: {$in: ids}}})
        return _.map(res.docs, toDoc)
    }
    public async add(doc:Doc) {
        await this.db.put(fromDoc(doc))
    }

    public async update(doc:Doc) {
        let origin = await this.db.get(doc.id)
        let param = fromDoc(doc)
        param["_rev"] = origin._rev
        delete doc.id
        await this.db.put(param)
    }

    public async delete(id:string) {
        let doc = await this.db.get(id)
        await this.db.remove(doc)
    }

    public async getAllByType(type:string):Promise<Doc[]> {
        let emit = PouchDB.emit
        let res = await this.db.query((doc) => {
            let d = doc as any
            emit(d.type)
          }, {key: type, include_docs: true})
        return res.rows.map((row) => {return toDoc(row.doc)})
    }

    public async getAll():Promise<Doc[]> {
        let allDocs = await this.db.allDocs({
            include_docs: true
        })
        return allDocs.rows.map((row) => {return toDoc(row.doc)})
    }

    async beginSync() {
        let remoteDBSetting = this.confSvc.getConf("remote-db")
        if (!remoteDBSetting) {
            return
        }
    
        this.remoteDB = new PouchDB(remoteDBSetting["addr"]) as any
        await this.remoteDB.logIn(remoteDBSetting["user"], remoteDBSetting["passwd"])
        log.info("prepare first init")
        await this.syncToRemote()
        log.info("first init succeed")
        setInterval(() => {
            this.syncToRemote()
        }, this.confSvc.getConf("sync-interval")* 1000)
    }

    async syncToRemote() {
        await this.db.sync(this.remoteDB).
        then(() => {logger("syncing").info("success sync")}).
        catch((err) => {logger("syncing").error(err)})
    }
}