import ResourceStore from './resourceStore'
import UIStore from './uiStore'
import SettingStore from './settingStore'
let us = new UIStore()
let ss = new SettingStore(us)
let rs = new ResourceStore(us, ss)

export default {
    resourceStore: rs,
    uiStore: us,
    settingStore: ss
}