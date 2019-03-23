import * as util from 'util'

const consoleLog = console.log

class Logger {
    ns: string
    schema: string
    constructor(ns?:string) {
        this.ns = ns || "global"
        this.schema = "["+this.ns+"] %s"
    }

    debug(format:any, ...params:any[]) {
        let msg = util.format(format,...params)
        consoleLog('\x1b[36m%s', util.format(this.schema, msg), '\x1b[0m')
    }

    info(format:any, ...params:any[]) {
        let msg = util.format(format,...params)
        consoleLog(util.format(this.schema, msg))
    }

    warn(format:any, ...params:any[]) {
        let msg = util.format(format,...params)
        consoleLog('\x1b[33m%s', util.format(this.schema, msg), '\x1b[0m')
    }

    error(format:any, ...params:any[]) {
        let msg = util.format(format,...params)
        consoleLog('\x1b[31m%s', util.format(this.schema, msg), '\x1b[0m')
    }

}

export default function createLogger(ns?:string) {
    return new Logger(ns)
}

export function replaceConsoleLog() {
    (global as any).logger = createLogger
    console.log = function (...params:any[]) {
        console.trace()
        throw "Use globa.logger instead! "
    }
}