import { observable, action, flow } from 'mobx'
import * as _ from 'lodash'
import {storeSetting, loadSetting} from '../lib/settings'
import axios from 'axios'
import BasicStore from './basicStore'

export default class SettingStore {
    @observable backups:any[]
    @observable settingModalVisible: boolean = false
    @observable backupsModalVisible: boolean = false
    
    bs:BasicStore

    constructor(bs:BasicStore) {
        this.bs = bs
        this.backups = []
    }

    @action
    showSettingModal() {
        this.settingModalVisible = true
    }

    @action
    hideSettingModal() {
        this.settingModalVisible = false
    }    

    @action
    showBackupsModal() {
        this.backupsModalVisible = true
    }

    @action
    hideBackupsModal() {
        this.backupsModalVisible = false
    }    

    @action
    toggleSafeMode(v: boolean) {
        this.bs.safeMode = v
        storeSetting("safeMode", v)
    }

    @action
    setServer(v: string) {
        this.bs.server = v
        storeSetting("server", v)
    }

    @action
    setKeybindings(v: string) {
        this.bs.keybindings = v
        storeSetting("keybindings", v)
    }

    openBackups = flow(function * openBackups ():any {
        try {
            let res = yield axios.get(this.bs.server + '/backups')
            let data = _.reverse(_.sortBy(res.data, (o)=> (o.start_time_in_millis)))
            this.backups.replace(data)
            this.showBackupsModal()
            this.bs.notify("加载成功")
        } catch(err) {
            this.bs.notify("加载失败")
            console.log(err)
        }
    })
    addBackup = flow(function * addBackup ():any {
        try {
            let res = yield axios.put(this.bs.server + '/backups')
            this.backups.replace([res.data, ...this.backups])
            this.bs.notify("添加成功")
        } catch(err) {
            this.bs.notify("添加失败")
            console.log(err)
        }
    })
    restoreBackup = flow(function * restoreBackup (id: string):any {
        try {
            yield axios.post(this.bs.server + '/restore?id=' + id)
            this.bs.notify("恢复成功")
        } catch(err) {
            this.bs.notify("恢复失败")
            console.log(err)
        }
    })
    deleteBackup = flow(function * deleteBackup (id:string):any {
        try {
            yield axios.delete(this.bs.server + '/backups?id=' + id)
            this.backups.replace(_.filter(this.backups, (o) => {
                return o.snapshot !== id
            }))
            this.bs.notify("执行成功")
        } catch(err) {
            this.bs.notify("执行失败")
            console.log(err)
        }
    })
}