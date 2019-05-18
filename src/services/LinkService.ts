import * as _ from 'lodash'
import KVService, {ErrNotFound} from './KVService'

const LINK_KEY = 'system_link'
const log = logger("LinkService")

export default class LinkService {
    constructor(private kvSvc:KVService) {}

    async init() {
        try {
            await this.kvSvc.get(LINK_KEY)
        } catch(e) {
            if (e === ErrNotFound) {
                await this.kvSvc.add({
                    id: LINK_KEY,
                    type: "system",
                    links: []
                })
            }
        }
    }

    async exist(link: string) {
        let doc = await this.kvSvc.get(LINK_KEY)
        let links = doc.links as string[]
        return _.indexOf(links, link) >= 0
    }

    async add(link: string) {
        let existed = await this.exist(link)
        if (existed) {
            log.info(`${link} already exists!`)
            throw "link existed"
        }
        let doc = await this.kvSvc.get(LINK_KEY)
        let links = doc.links as string[]
        if (_.findIndex(links, link) >= 0) {
            return
        }
        links.push(link)
        doc.links = links
        await this.kvSvc.update(doc)
    }
}