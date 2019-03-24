import {Link, Tag, hashCode} from '../models'
import * as express from 'express'
import * as bodyParser from 'body-parser'
import * as cors from 'cors'
import _ from 'lodash'
import {getStore} from '../store'
import { getPort } from '../setting'
import {router} from './handlers'

class RPCRequest {
    method: string
    args: any[]
}

class RPCResponse {
    result:any
    error:any
    constructor(res:any, err: any) {
        this.result = res
        this.error = err
    }
}

function handleRPC(req:express.Request, res:express.Response, next:express.NextFunction) {
    let rpcReq = JSON.parse(req.body.toString()) as RPCRequest
    router.get(rpcReq.method).apply(null, rpcReq.args).then((result:any) => {
        res.status(200).send(new RPCResponse(result, null))
    }).catch((err:any) => {
        logger("rpc error").warn(err)
        res.status(200).send(new RPCResponse(null, err))
    })
}

async function initHttp() {
    const app = express()

    app.use((req, res, next) => {
        next()
        logger("Web").info(req.path, res.statusCode)
    })
    app.disable('etag')
    app.use(bodyParser.raw({
        inflate: true,
        limit: '1MB',
        type: '*/*'
    }))
    app.use(cors())
    
    app.get('/resources/link/exist', (req, res, next) => {
        let url = req.query.url as string
        logger("Web").info(`check if ${url} exist`)
        getStore().then((store) => {
            return store.linkExist(url)
        }).then((exist) => {
            if (exist) {
                res.status(201).send("")
            } else {
                res.status(200).send("")
            }
            next()
        })
    })
    
    app.post('/resources/link', (req, res, next) => {
        let body = JSON.parse(req.body.toString()) as any
        let tags = _.map((body.tags) || [], (o) => {
            return new Tag(o)
        })
        getStore().then((store) => {
            let link = new Link(hashCode(body.url), body.title, body.from, body.favicon)
            link.tags = tags
            return store.addLink(link)
        }).then((result) => {
            logger("Web").info(`Successful stored ${body.title} <${body.url}>`)
            res.status(200).send("")
            next()
        }).catch(() => {
            res.status(500).send("")
            next()
        })
    })

    app.post('/rpc', handleRPC)
    let port = getPort()
    return new Promise((receive, reject) => {
        app.listen(port, () => {
            logger("main").info(`Example app listening on port ${port}!`)
            receive()
        })
    })
    
}

export async function init() {
    await initHttp()
}
