import React from "react"
import * as _ from 'lodash'
import {bindWith} from './base'
import NotificationManager from '../components/NotificationManager'
import BasicStore from "../stores/basicStore"

export default bindWith(['basicStore'], (props:{
    basicStore: BasicStore
}) => {
    let bs = props.basicStore
    return <NotificationManager {...bs.notifyBuffer}></NotificationManager>
})

