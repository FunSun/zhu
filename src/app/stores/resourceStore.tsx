import { observable, action, flow } from 'mobx'
import axios from 'axios'

export interface Resource {
    id: string
}

export default class ResourceStore {
    @observable resources:any = []
        
    reload = flow(function * (query: string):any {
        console.log('foodkfjdk')
        try {
            let res = yield axios.get(encodeURI('http://localhost:8070/resources/search?q=' + query))
            this.resources = res.data
        } catch(err) {
            console.log(err)
        }

    })
}