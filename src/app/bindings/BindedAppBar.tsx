import React from "react"
import * as _ from 'lodash'
import {bindWith} from './base'
import ResourceStore from '../stores/resourceStore'
import SettingStore from '../stores/settingStore'
import SnippetStore from '../stores/snippetStore'
import AppBar from '../components/AppBar'

export default bindWith(['resourceStore', 'snippetStore', 'settingStore'], (props: {
    resourceStore: ResourceStore,
    settingStore: SettingStore,
    snippetStore: SnippetStore
}) => {
    let rs = props.resourceStore
    let ss = props.settingStore
    let snippet = props.snippetStore
    return <AppBar
        query={rs.query}
        onAddIconClicked={ss.showSettingModal.bind(ss)}
        onCommentIconClicked={snippet.showSnippetModal.bind(snippet)}
        onEditIconClicked={()=>{}}
        onQueryChange={rs.updateQuery.bind(rs)}
        onSubmit={rs.reload.bind(rs)}
    ></AppBar>
})
