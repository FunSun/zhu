import {createContext, useContext} from 'react'
import { observable, action} from 'mobx'
import * as _ from 'lodash'

export class SettingStore {
    @observable settingModalVisible: boolean = false
    
    @action
    showSettingModal() {
        this.settingModalVisible = true
    }

    @action
    hideSettingModal() {
        this.settingModalVisible = false
    }    
}

let store = new SettingStore()
export {store}
let ctx = createContext(store)
export default function () { return useContext(ctx)}

