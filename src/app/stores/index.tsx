import ResourceStore from './resourceStore'
import UIStore from './uiStore'
import SettingStore from './settingStore'
import EditorStore from './editorStore'
let us = new UIStore()
let ss = new SettingStore(us)
let rs = new ResourceStore(us, ss)
let es = new EditorStore(us, ss)

export default {
    resourceStore: rs,
    uiStore: us,
    settingStore: ss,
    editorStore: es
}