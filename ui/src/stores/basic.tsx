import {createContext, useContext} from 'react'
import { observable, action, flow } from 'mobx'
import * as _ from 'lodash'
import axios from 'axios'

export class BasicStore {
    @observable notifyBuffer: any = []
    @observable confirmAlertVisible: boolean = false
    @observable confirmAlertTitle:string = ""
    @observable confirmAlertDesc: string = ""
    @observable confirmAlertAction = ()=>{}
    
    constructor() {
    }

    @action
    notify(msg:string, kind:string='info') {
        this.notifyBuffer = {
            id: Date.now(),
            msg,
            kind
        }
    }

    @action
    showConfirmAlert(title: string, desc: string, action:()=>void) {
        this.confirmAlertVisible = true
        this.confirmAlertTitle = title
        this.confirmAlertDesc = desc
        this.confirmAlertAction = action
    }

    @action
    hideConfirmAlert() {
        this.confirmAlertVisible = false
    }

}

let store = new BasicStore()
export {store}
let ctx = createContext(store)
export default function () { return useContext(ctx)}

export async function invokeRPC(method: string, ...args: any[]):Promise<any> {
    let res = await axios.post(`http://localhost:8070/rpc`, {method, args})
    let data = res.data
    if (data.error) {
        throw data.error
    }
    return data.result
}

function doNotify(lvl:string, msg: string) {
    store.notify(msg, lvl)
}

export const notify = {
    warn: doNotify.bind(null, "warn"),
    info: doNotify.bind(null, "info")
}
