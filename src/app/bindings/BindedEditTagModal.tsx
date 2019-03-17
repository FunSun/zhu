import React from "react"
import * as _ from 'lodash'
import {bindWith} from './base'
import EditTagModal from '../components/EditTagModal'
import TagStore from '../stores/tagStore'

export default bindWith(['tagStore'], (props: {
    tagStore: TagStore
}) => {
    let ts = props.tagStore
    return <EditTagModal
        tags={ts.editTagModalBuffer.tags}
        visible={ts.editTagModalVisible}
        onClose={ts.hideEditTagModal.bind(ts)}
        onSubmit={(tags) => {ts.updateTags(ts.editTagModalBuffer.id, tags); ts.hideEditTagModal()}}
    ></EditTagModal>
})

