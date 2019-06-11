import * as flexsearch from  'flexsearch'
import * as _ from 'lodash'
import * as moment from 'moment'

function tokenize(str:string){
    str = str.replace(/([^\x00-\x7F])/g, " $1 ")
    str = str.replace(/([0-9a-zA-Z]+)/g, " $1 ")
    str = _.toLower(str)
    str.replace(/[!@#$%^&*()-_=+{}\[\]\\|;:'"/?<>,.]/g, " ")
    return _.filter(str.split(" "), (o) => {return o!=="" && o !== " "})
}

export default class SearchService {
    idx: flexsearch.Index

    constructor() {}

    async init() {
        this.idx = flexsearch.create({
            encode: false,
            tokenize: tokenize,
            async: true
        })
    }

    async add(id:string, fulltext: string, tags:string[]) {
        this.idx.add(id, fulltext)
    }
    
    async update(id:string, fulltext: string, tags:string[]) {
        this.idx.update(id, fulltext)
    }

    async delete(id:string) {
        this.idx.remove(id)
    }

    async search(query:string, tags:string[]):Promise<string[]> {
        let today = moment().format("YYYY-MM-DD")
        query = query.replace("今天", today)
        let ids = await this.idx.search(query)
        return ids as string[]
    }

    async clear(): Promise<void> {
        let oldIdx = this.idx
        oldIdx.destroy()
        this.idx = flexsearch.create({
            encode: false,
            tokenize: tokenize,
            async: true
        })
    }
}