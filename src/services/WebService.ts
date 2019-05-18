import ConfigSerivce from './ConfigSerivce'
import PageService from './PageService'
import LinkService from './LinkService'

import * as express from 'express'
import _ from 'lodash'

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



import * as bodyParser from 'body-parser'
import * as cors from 'cors'
import {getAppDir} from '../lib/tools'


export default class WebService {
    app: express.Express

    constructor(private confSvc:ConfigSerivce, private pgSvc: PageService, private linkSvc:LinkService) {}

    async init() {
        let app = express()
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
        app.use('/ui', express.static(getAppDir() + '/ui'))
    
        app.get('/resources/link/exist', this.handleLinkExist.bind(this))
        
        app.post('/resources/link', this.handleNewLink.bind(this))
    
        app.post('/rpc', this.handleRPC.bind(this))
    
        let port = this.confSvc.getConf("port")
        await new Promise((resolve, reject) => {
            app.listen(port, resolve)
        })
        this.app = app
    }

    handleRPC(req:express.Request, res:express.Response, next:express.NextFunction) {
        let rpcReq = JSON.parse(req.body.toString()) as RPCRequest
        let path = rpcReq.method
        logger("rpc").info("invoke: ", path)
        let [svcName, method] = path.split(".")
        let svc:any = null
        switch(svcName) {
            case "page": 
            svc = this.pgSvc
            break
            default:
            logger("rpc").error("service %s not exist", svcName)
            res.status(404).send("")
            return
        }
        if (!svc[method]) {
            logger("rpc").error("rpc %s not exist", path)
            res.status(404).send("")
            return
        }
        svc[method].apply(svc, rpcReq.args).then((result:any) => {
            res.status(200).send(new RPCResponse(result, null))
        }).catch((err:any) => {
            logger("rpc error").warn(err)
            res.status(200).send(new RPCResponse(null, err.toString()))
        })
    }
    handleLinkExist(req:express.Request, res:express.Response, next:express.NextFunction) {
        let url = req.query.url as string
        logger("Web").info(`check if ${url} exist`)
        let svc = this.linkSvc
        svc.exist(url).then((exist) => {
            if (exist) {
                res.status(201).send("")
            } else {
                res.status(200).send("")
            }
            next()
        })
    }
    
    handleNewLink(req:express.Request, res:express.Response, next:express.NextFunction) {
        let body = JSON.parse(req.body.toString()) as any
        this.linkSvc.add(body.url).then(() => {
            return this.pgSvc.add([{
                type: "link",
                data: {
                    from: body.url,
                    favicon: body.favicon,
                    title: body.title
                }
            }, {
                type: "tags",
                data: body.tags
            }])
        }).then((result) => {
            logger("Web").info(`Successful stored ${body.title} <${body.url}>`)
            res.status(200).send("")
            next()
        }).catch(() => {
            res.status(500).send("")
            next()
        })
    }
}