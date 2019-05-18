import * as path from 'path'

export function getAppDir(): string {
    let appFile  = process.argv[0]
    if (process.argv[0].endsWith("node")) {
        appFile = process.argv[1]
    }
    return path.dirname(appFile)
}