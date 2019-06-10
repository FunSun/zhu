import PageService from './PageService'

import * as express from 'express'
import * as bodyParser from 'body-parser'
import _ from 'lodash'

import * as cors from 'cors'

export default class WebService {
    app: express.Express

    constructor(private pgSvc: PageService) {}

    async init() {
        let app = express()
        app.use((req, res, next) => {
            next()
            logger("Slack").info(req.path, res.statusCode)
        })
        app.use(bodyParser.json())
        app.use(bodyParser.urlencoded({ extended: true }))
        app.disable('etag')
        app.use(cors())
        
        app.post('/slack', this.handleSlackNotify.bind(this))
    
        await new Promise((resolve, reject) => {
            app.listen("8071", resolve)
        })
        this.app = app
    }
    
    handleSlackNotify(req:express.Request, res:express.Response, next:express.NextFunction) {
        let body = req.body as any
        this.pgSvc.add([{
            type: 'p',
            data: body.text
        }]).then((result) => {
            logger("Slack").info(`Successful stored ${body.text}`)
            res.status(200).json({
                text: "收到"
            })
            next()
        }).catch(() => {
            res.status(500).send("")
            next()
        })
    }
}
