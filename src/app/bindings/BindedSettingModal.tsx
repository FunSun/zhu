import React from "react"
import * as _ from 'lodash'
import {bindWith} from './base'
import SettingModal from '../components/SettingModal'
import BasicStore from "../stores/basicStore"
import SettingStore from "../stores/settingStore"

export default bindWith(['basicStore', 'settingStore'], (props: {
    basicStore: BasicStore,
    settingStore: SettingStore
}) => {
    let bs = props.basicStore
    let ss = props.settingStore
    return <SettingModal
        visible={ss.settingModalVisible}
        server={bs.server}
        keybindngs={bs.keybindings}
        safeMode={bs.safeMode}
        onServerChange={ss.setServer.bind(ss)}
        onKeybindingChange={ss.setKeybindings.bind(ss)}
        onSafeModeToggle={ss.toggleSafeMode.bind(ss)}
        onOpenBackups={() => {ss.hideSettingModal(); ss.openBackups()}}
        onClose={ss.hideSettingModal.bind(ss)}
    ></SettingModal>
})

