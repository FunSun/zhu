import React from "react"
import * as _ from 'lodash'
import NotificationManager from '../components/NotificationManager'
import  useBasicStr from "../stores/basic"
import { observer } from "mobx-react-lite"

export default observer(() => {
    let bs = useBasicStr()
    return <NotificationManager {...bs.notifyBuffer}></NotificationManager>
})


