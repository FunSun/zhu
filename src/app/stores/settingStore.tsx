import { observable, action } from 'mobx'
import * as _ from 'lodash'
import {storeSetting, loadSetting} from '../lib/settings'

export default class SettingStore {
    @observable safeMode:boolean
    @observable server: string
    @observable keybindings: string
    constructor() {
        this.safeMode = loadSetting("safeMode")
        this.server = loadSetting("server")
        this.keybindings = loadSetting("keybindings")
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
}