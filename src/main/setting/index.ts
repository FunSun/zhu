import * as fs from 'fs'

let conf:any = {}

export function getLocalDB():string {
    return conf["local-db"]
}

export function getRemoteDB(): any {
    return conf["remote-db"]
}

export function getIndexCache(): string {
    return conf["index-cache"]
}

export function getPort(): number {
    return conf["port"]
}

export function init() {
    conf = JSON.parse(fs.readFileSync("./settings.json").toString())
}