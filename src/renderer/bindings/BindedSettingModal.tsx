import React from "react"
import * as _ from 'lodash'
import {bindWith} from './base'
import SettingStore from "../stores/settingStore"

export default bindWith(['settingStore'], (props: {
    settingStore: SettingStore
}) => {
    return <div></div>
})

