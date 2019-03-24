import * as fs from 'fs'
import { homedir } from 'os'
import { join } from 'path'

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

export function getNSFW(): boolean {
    return conf["NSFW"]
}

export async function init() {
    let target = null
    if (fs.existsSync("./settings.json")) {
        target = "./settings.json"
    } else if (fs.existsSync(join(homedir(), ".zhu/settings.json"))) {
        target = join(homedir(), ".zhu/settings.json")
    } else {
        throw "settings.json not found"
    }
    conf = JSON.parse(fs.readFileSync(target).toString())
    let glb = (global as any)
    glb.port = conf["port"]
}