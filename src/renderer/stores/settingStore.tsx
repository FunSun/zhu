import { observable, action} from 'mobx'
import * as _ from 'lodash'

export default class SettingStore {
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