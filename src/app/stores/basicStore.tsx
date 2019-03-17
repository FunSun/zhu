import { observable, action, flow } from 'mobx'
import * as _ from 'lodash'
import axios from 'axios'
import {storeSetting, loadSetting} from '../lib/settings'

export default class BasicStore {
    @observable safeMode:boolean
    @observable server: string
    @observable keybindings: string
    @observable notifyBuffer: any = []
    @observable confirmAlertVisible: boolean = false
    @observable confirmAlertTitle:string = ""
    @observable confirmAlertDesc: string = ""
    @observable confirmAlertAction = ()=>{}
    
    constructor() {
        this.safeMode = loadSetting("safeMode")
        this.server = loadSetting("server")
        this.keybindings = loadSetting("keybindings")
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