// logger as a builtin
import {replaceConsoleLog} from '../lib/logger'
replaceConsoleLog()

import {ArgsConfigService} from './ConfigSerivce'

const testConf:any = {
    "field1": "val1",
    "field2": {
        "sub1": "val2"
    },
    "field3": {
        "sub2": {
            "sub3": "val3"
        }
    }
}
test("ConfigService", async()=> {
     let confSvc = new ArgsConfigService()
    await confSvc.init(testConf)
    expect(confSvc.getConf("field1")).toBe("val1")
    expect(confSvc.getConf("field2.sub1")).toBe("val2")
    expect(confSvc.getConf("field3.sub2.sub3")).toBe("val3")
    expect(confSvc.getConf("field3.sub2.sub3.sub4", "fallbackConf")).toBe("fallbackConf")
})