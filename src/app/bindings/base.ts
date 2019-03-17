import { inject, observer } from "mobx-react"
import ResourceStore from "../stores/resourceStore"
import UIStore from "../stores/uiStore"
import SettingStore from '../stores/settingStore'
import EditorStore from '../stores/editorStore'

// interface OriginBindingProps {
//     uiStore: UIStore
//     resourceStore: ResourceStore
//     settingStore: SettingStore
//     editorStore: EditorStore
// }

export interface BindingProps {
    ui: UIStore
    resource: ResourceStore
    setting: SettingStore
    editor: EditorStore
    
}

export function bind(comp:(props:BindingProps)=>React.ReactElement<any>) {
    return (inject("uiStore", "resourceStore", "settingStore", "editorStore")(observer((props:any):React.ReactElement<any> => {
        return comp({
            ui: props.uiStore,
            resource: props.resourceStore,
            setting: props.settingStore,
            editor: props.editorStore
        })
    })))
}


