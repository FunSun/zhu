// logger as a builtin
import {replaceConsoleLog} from '../lib/logger'
replaceConsoleLog()


import {ArgsConfigService} from './ConfigSerivce'
import KVService from './KVService'
import LinkService from './LinkService'
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
test("LinkService", async () => {
    if (fs.existsSync("/tmp/testdb")) {
        rimraf("/tmp/testdb")
    }
    let confSvc =new ArgsConfigService()
    await confSvc.init(testConf)
    let kvSvc = new KVService(confSvc)
    await kvSvc.init()
    let linkSvc = new LinkService(kvSvc)
    await linkSvc.init()
    const testLink = "http://letus.rocks"
    let exists = await linkSvc.exist(testLink)
    expect(exists).toBeFalsy()
    await linkSvc.add(testLink)
    exists = await linkSvc.exist(testLink)
    expect(exists).toBeTruthy()
    let throwErr = false
    try {
        await linkSvc.add(testLink)
    } catch(e) {
        throwErr = true
    }
    expect(throwErr).toBeTruthy()
})
