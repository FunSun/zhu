import {PageX, Tag, getUUID} from '../models'
import {getStore} from '../store'
import _ from 'lodash'


let router = new Map<string, (...args:any[])=>Promise<any>>()
router.set("randomSearch", async (limit:number) => {
    let store = await getStore()
    let res = await store.randomSearch(limit)
    return res
})

router.set("addPageX", async(content:string, tags:string[]) => {
    let store = await getStore()
    let id = getUUID()
    let pagex = new PageX(id, content)
    pagex.tags = _.map(tags, (o)=> {return new Tag(o)})
    let doc = await store.addPageX(pagex)
    logger("add pagex").info("id is", doc.id)
    return doc
})

router.set("updatePageX", async(id:string, content:string, tags:string[]) => {
    let store = await getStore()
    await store.updatePageXContent(id, content)
    logger("update pagex").info("id is", id)
})

router.set("findByType", async(type: string, offset:number, limit:number) => {
    let store = await getStore()
    return await store.findByType(type, offset, limit)
})

router.set("search", async(query:string, offset:number, limit:number) => {
    let store = await getStore()
    return await store.simpleSearch(query, offset, limit)
})

router.set("updateTags", async(id:string, tags: string[]) => {
    let store = await getStore()
    await store.updateTags(id, _.map(tags, (o)=> {return new Tag(o)}))
})

router.set("deleteResource", async(id:string) => {
    let store = await getStore()
    await store.deleteResource(id)
})

export {router}
