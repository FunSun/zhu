import { observable, action, flow } from 'mobx'
import * as _ from 'lodash'
import {storeSetting, loadSetting} from '../lib/settings'
import axios from 'axios'
import BasicStore from './basicStore'

export default class SettingStore {
    @observable settingModalVisible: boolean = false
    
    bs:BasicStore

    constructor(bs:BasicStore) {
        this.bs = bs
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
}