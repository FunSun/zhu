import { observable, action, flow } from 'mobx'
import * as _ from 'lodash'
import {storeSetting, loadSetting} from '../lib/settings'
import axios from 'axios'
import UIStore from './uiStore'

export default class SettingStore {
    @observable safeMode:boolean
    @observable server: string
    @observable keybindings: string
    @observable backups:any[]
    us: UIStore
    constructor(us:UIStore) {
        this.us = us
        this.safeMode = loadSetting("safeMode")
        this.server = loadSetting("server")
        this.keybindings = loadSetting("keybindings")
        this.backups = []
    }

    @action
    toggleSafeMode(v: boolean) {
        this.safeMode = v
        storeSetting("safeMode", v)
    }

    @action
    setServer(v: string) {
        this.server = v
        storeSetting("server", v)
    }

    @action
    setKeybindings(v: string) {
        this.keybindings = v
        storeSetting("keybindings", v)
    }

    openBackups = flow(function * openBackups ():any {
        try {
            let res = yield axios.get(this.server + '/backups')
            let data = _.reverse(_.sortBy(res.data, (o)=> (o.start_time_in_millis)))
            this.backups.replace(data)
            this.us.showBackupsModal()
            this.us.notify("加载成功")
        } catch(err) {
            this.us.notify("加载失败")
            console.log(err)
        }
    })
    addBackup = flow(function * addBackup ():any {
        try {
            let res = yield axios.put(this.server + '/backups')
            this.backups.replace([res.data, ...this.backups])
            this.us.notify("添加成功")
        } catch(err) {
            this.us.notify("添加失败")
            console.log(err)
        }
    })
    restoreBackup = flow(function * restoreBackup (id: string):any {
        try {
            yield axios.post(this.server + '/restore?id=' + id)
            this.us.notify("恢复成功")
        } catch(err) {
            this.us.notify("恢复失败")
            console.log(err)
        }
    })
    deleteBackup = flow(function * deleteBackup (id:string):any {
        try {
            yield axios.delete(this.server + '/backups?id=' + id)
            this.backups.replace(_.filter(this.backups, (o) => {
                return o.snapshot !== id
            }))
            this.us.notify("执行成功")
        } catch(err) {
            this.us.notify("执行失败")
            console.log(err)
        }
    })
}