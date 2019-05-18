import React from "react"
import * as _ from 'lodash'
import SnippetModal from '../components/SnippetModal'
import useSnippetStr from '../stores/snippet'
import { observer } from "mobx-react-lite"
import SlateEditor from "../components/SlateEditor"

export default observer(()=> {
    let store = useSnippetStr()

    let onClose = () => {store.hideSnippetModal()}

    return <SnippetModal
        visible={store.visible}
        onClose={onClose}
    >
        <SlateEditor 
            onSave={(v)=> {store.submitSnippet(v)}}
            value={store.content}
            onChange={(v) => {store.updateCache(v)}}
        ></SlateEditor>
    </SnippetModal>
})
