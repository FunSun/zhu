import React from "react"
import * as _ from 'lodash'
import {bindWith} from './base'
import SettingModal from '../components/SettingModal'
import BasicStore from "../stores/basicStore"
import SettingStore from "../stores/settingStore"
import BackupsModal from '../components/BackupsModal'

const RestoreConfirmTitle = "数据恢复"
const RestoreConfirmDesc = "确定将数据恢复这个时间点吗？"
const DeleteBackupConfirmTitle = "删除备份"
const DeleteBackupConfirmDesc = "确定要删除这个备份吗？"

export default bindWith(['basicStore', 'settingStore'], (props: {
    basicStore: BasicStore,
    settingStore: SettingStore
})=> {
    let ss = props.settingStore
    ss.backups.length
    let bs = props.basicStore
    
    return <BackupsModal
        visible={ss.backupsModalVisible}
        backups={ss.backups}
        onAddBackup={ss.addBackup.bind(ss)}
        onRestore={(id:string)=> {
            bs.showConfirmAlert(
                RestoreConfirmTitle,
                RestoreConfirmDesc,
                () => {
                    ss.restoreBackup(id)
                }
            )
        }}
        onDelete={(id:string) => {
            bs.showConfirmAlert(
                DeleteBackupConfirmTitle,
                DeleteBackupConfirmDesc,
                () => {
                ss.deleteBackup(id)
            })
        }}
        onClose={ss.hideBackupsModal.bind(ss)}
    ></BackupsModal>
})
