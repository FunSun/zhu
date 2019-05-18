// logger as a builtin
import {replaceConsoleLog} from '../lib/logger'
replaceConsoleLog()


import {ArgsConfigService} from './ConfigSerivce'
import KVService, {ErrNotFound} from './KVService'
import * as fs from 'fs'
import * as path from 'path'

const testConf:any = {
    "local-db": "/tmp/testdb",
    "remote-db": null
}

function rimraf(dir_path:string) {
    if (fs.existsSync(dir_path)) {
        fs.readdirSync(dir_path).forEach(function(entry) {
            var entry_path = path.join(dir_path, entry)
            if (fs.lstatSync(entry_path).isDirectory()) {
                rimraf(entry_path)
            } else {
                fs.unlinkSync(entry_path)
            }
        })
        fs.rmdirSync(dir_path)
    }
}
test("KVService", async () => {
    if (fs.existsSync("/tmp/testdb")) {
        rimraf("/tmp/testdb")
    }
    let confSvc =new ArgsConfigService()
    await confSvc.init(testConf)
    let kvSvc = new KVService(confSvc)
    await kvSvc.init()
    await kvSvc.add({
        id: "foo",
        type: "bar",
        val: "zzz"
    })
    let res = await kvSvc.get("foo")
    expect(res.id).toBe("foo")
    expect(res.type).toBe("bar")
    expect(res.val).toBe("zzz")

    await kvSvc.add({
        id: "foo1",
        type: "bar",
        val: "zzz"
    })
    await kvSvc.add({
        id: "foo2",
        type: "bar1",
        val: "zzz"
    })
    let docs = await kvSvc.getAllByType("bar")
    expect(docs.length).toBe(2)
    expect(docs[0].val).toBe("zzz")

    docs = await kvSvc.getAll()
    expect(docs.length).toBe(3)
    expect(docs[1].val).toBe("zzz")

    docs = await kvSvc.getMany(["foo1", "foo2"])
    expect(docs.length).toBe(2)
    expect(docs[0].id).toBe("foo1")
    expect(docs[1].id).toBe("foo2")
    expect(docs[0].val).toBe("zzz")
    expect(docs[1].val).toBe("zzz")

    await kvSvc.delete("foo1")
    try {
        res = await kvSvc.get("foo1")
    } catch(err) {
        expect(err).toBe(ErrNotFound)
    }
})