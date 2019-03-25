import React from "react"
import * as _ from 'lodash'
import EditTagModal from '../components/EditTagModal'
import useTagStr from '../stores/tag'
import { observer } from "mobx-react-lite"

export default observer(() => {
    let ts = useTagStr()
    return <EditTagModal
        tags={ts.editTagModalBuffer.tags}
        visible={ts.editTagModalVisible}
        onClose={ts.hideEditTagModal.bind(ts)}
        onSubmit={(tags) => {ts.updateTags(ts.editTagModalBuffer.id, tags); ts.hideEditTagModal()}}
    ></EditTagModal>
})
