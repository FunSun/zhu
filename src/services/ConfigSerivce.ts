import * as fs from 'fs'

const log = logger("ConfigService")

class ConfigServiceBase {
    conf: any

    public getConf(paths:string, fallback?: any): any {
        let pathsArr = paths.split(".")
        let subConf = this.conf
        for (let path of pathsArr) {
            if (subConf === undefined) {
                break
            }
            subConf = subConf[path]
        }
        if (subConf !== undefined) {
            return subConf
        }
        log.warn("cannot find config for: ", paths)
        if (fallback === undefined) {
            throw "Need config"
        }
        return fallback
    }
}

export class FsConfigService extends ConfigServiceBase {
    public async init() {
        let target = null
        if (fs.existsSync("./config.json")) {
            target = "./config.json"
        } else if (fs.existsSync("/etc/zhu/config.json")) {
            target = "/etc/zhu/config.json"
        } else {
            throw "config.json not found"
        }
        this.conf = JSON.parse(fs.readFileSync(target).toString())
    }
}

export class ArgsConfigService extends ConfigServiceBase {
    public async init(conf:any) {
        this.conf = conf
    }
}

export default interface ConfigService {
    getConf(paths:string, fallback?: any): any
}