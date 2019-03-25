import React from "react"
import * as _ from 'lodash'
import useResourceStr from '../stores/resource'
import useSettingStr from '../stores/setting'
import useSnippetStr from '../stores/snippet'
import AppBar from '../components/AppBar'
import {observer} from 'mobx-react-lite'

export default observer(() => {
    let rs = useResourceStr()
    let ss = useSettingStr()
    let snippet = useSnippetStr()
    return <AppBar
        query={rs.query}
        onAddIconClicked={ss.showSettingModal.bind(ss)}
        onCommentIconClicked={snippet.newSnippet.bind(snippet)}
        onEditIconClicked={()=>{}}
        onQueryChange={rs.updateQuery.bind(rs)}
        onSubmit={rs.reload.bind(rs)}
    ></AppBar>
})
