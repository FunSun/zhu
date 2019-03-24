import React from "react"
import * as _ from 'lodash'
import {bindWith} from './base'
import ConfirmAlert from '../components/ConfirmAlert'
import {BasicStore} from "../stores/common"

export default bindWith(['basicStore'], (props:{
    basicStore: BasicStore
}) => {
    let bs = props.basicStore
    return <ConfirmAlert
        visible={bs.confirmAlertVisible}
        title={bs.confirmAlertTitle}
        desc={bs.confirmAlertDesc}
        onConfirm={() => {
            bs.confirmAlertAction()
            bs.hideConfirmAlert()
        }}
        onCancel={bs.hideConfirmAlert.bind(bs)}
    ></ConfirmAlert>
})

