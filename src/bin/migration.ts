// logger as a builtin
import {replaceConsoleLog} from '../lib/logger'
replaceConsoleLog()

import {ArgsConfigService} from '../services/ConfigSerivce'
import KVService, {Doc} from '../services/KVService'
import LinkService from '../services/LinkService'
import * as _ from 'lodash'
import * as PouchDB from 'pouchdb'
import {parse} from './pagex'

async function readOldDocs():Promise<any[]> {
    let originDB = new PouchDB("/home/quanbit/.zhu/local", {adapter: "leveldb", revs_limit: 10})
    let allDocs = await originDB.allDocs({
        include_docs: true
    })
    let oldDocs = allDocs.rows.map((row) => {return row.doc})
    oldDocs = _.filter(oldDocs, (oldDoc:any) => {
        if (oldDoc.type === 'link' || oldDoc.type === 'pagex') {
            return true
        }
        return false
    })
    return oldDocs
}

function migrateDoc(oldDoc:any):Doc {
    if (oldDoc.type === 'link') {
        return {
            id: oldDoc._id,
            type: 'page',
            created: oldDoc.created,
            modified: oldDoc.created,
            blocks: [{
                type: "link",
                data: {
                    from: oldDoc.from,
                    favicon: oldDoc.favicon,
                    title: oldDoc.title
                }
            }, {
                type: "tags",
                data: oldDoc.tags
            }]
        }
    } else if (oldDoc.type === 'pagex') {
        let blocks = _.map(parse(oldDoc.content), (pagexBlock) => {
            return {
                type: pagexBlock.type,
                data: pagexBlock.data
            }
        })
        blocks.push({
            type: "tags",
            data: oldDoc.tags
        })
        return {
            id: oldDoc._id,
            type: 'page',
            created: oldDoc.created,
            modified: oldDoc.created,
            blocks: blocks
        }
    } else {
        throw "error type"
    }
}

let conf:any = {
    "local-db": "/workspace/docker/zhu/local",
    "remote-db": null
}


async function main() {
    let confSvc = new ArgsConfigService()
    await confSvc.init(conf)
    let kvSvc = new KVService(confSvc)
    await kvSvc.init()
    let linkSvc = new LinkService(kvSvc)
    await linkSvc.init()

    let oldDocs = await readOldDocs()
    let newDocs = _.map(oldDocs, migrateDoc)
    await _.each(newDocs, async (doc) => {
        await kvSvc.add(doc)
    })

    for (let oldDoc of oldDocs) {
        if (oldDoc.type === 'link') {
            try {
                await linkSvc.add(oldDoc.from)
            } catch (err) {

                logger("migration").info(err, " ", oldDoc._id)
            }
            
        }
    }
}

main().catch((err) => {
    logger("main").error(err)
  })
