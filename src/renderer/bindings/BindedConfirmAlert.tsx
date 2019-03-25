import React from "react"
import * as _ from 'lodash'
import ConfirmAlert from '../components/ConfirmAlert'
import useBasicStr from "../stores/basic"
import { observer } from "mobx-react-lite"

export default observer(() => {
    let bs = useBasicStr()
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

