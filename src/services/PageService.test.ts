// logger as a builtin
import {replaceConsoleLog} from '../lib/logger'
replaceConsoleLog()


import {ArgsConfigService} from './ConfigSerivce'
import KVService from './KVService'
import * as fs from 'fs'
import * as path from 'path'
import SearchService from './SearchService'
import PageService from './PageService'

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
let testdata1 = [{
    "type": "p",
    "data": "fdfdf"
}]

let testdata2 = [{
    "type": "#",
    "data": {
        "lvl": 1,
        "title": "dfdfs"
    }
},{
    "type": "p",
    "data": "fdfdf"
}]

test("PageService", async () => {
    if (fs.existsSync("/tmp/testdb")) {
        rimraf("/tmp/testdb")
    }
    let confSvc =new ArgsConfigService()
    await confSvc.init(testConf)
    let kvSvc = new KVService(confSvc)
    await kvSvc.init()
    let schSvc = new SearchService()
    await schSvc.init()
    let pageSvc = new PageService(kvSvc, schSvc)
    let page = await pageSvc.add(testdata1)
    logger("PageService").debug(page)
    await pageSvc.update(page.id, testdata2)
})
