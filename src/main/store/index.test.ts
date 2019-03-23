import * as PouchDB from 'pouchdb'
import {Store} from './index'
import {PageX} from '../models'

test("store", async ()=> {
    let db = new PouchDB("zhu", {adapter: "leveldb"})

    await db.destroy()
    let store = new Store()
    await store.addPageX(new PageX("a", "测试store的搜索"))
    await store.addPageX(new PageX("b", "不要搜到文档"))
    let res = await store.simpleSearch("测试")
    expect(res[0]['_id']).toEqual('a')
})