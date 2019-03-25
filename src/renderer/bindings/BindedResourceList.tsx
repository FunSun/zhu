import React from "react"
import * as _ from 'lodash'
import ResourceList from '../components/ResourceList'
import {Preview, EditAction, LabelAction, DeleteAction, LinkRow, PageXRow, ExpandedAction} from '../components/Previews'
import {observer} from 'mobx-react-lite'
import useResourceStr from "../stores/resource"
import useTagStr from "../stores/tag"
import useSnippetStr from "../stores/snippet"
import useBasicStr from '../stores/basic'

const DeleteResourceConfirmTitle = "确认删除?"
const DeleteResourceConfirmDesc = "你确定要删除这个条目吗?"

export default observer(() => {
    // explicit declare dependency on inner structure
    let bs = useBasicStr()
    let rs = useResourceStr()
    let ts = useTagStr()
    let ss = useSnippetStr()
    let resources = rs.resources
    resources.length
    let onScrollToEnd = () => {rs.loadMore()}

    let previews = _.map(resources, (resource) => {
        let rows = null
        // onTag={() => {rs.addTagToQuery(resource.tags)}}
        let actions = [
            <LabelAction key="label" onLabel={() => {ts.showEditTagModal(resource.id, resource.tags)}}></LabelAction>,
            <DeleteAction key="delete" onDelete={() => {
                bs.showConfirmAlert(DeleteResourceConfirmTitle, DeleteResourceConfirmDesc, () => {
                    rs.deleteResource(resource.id)
                })
            }}></DeleteAction>
        ]
    
        switch(resource.type) {
            case 'link':
                rows = [<LinkRow 
                    key={resource.id}
                    favicon={resource.favicon}
                    from={resource.from}
                    title={resource.title}
                ></LinkRow>]
                break
            case 'pagex':
                let expanded = !!resource.expanded
                rows = [<PageXRow key={resource.id} expanded={expanded} content={resource.content}></PageXRow>]
                actions.unshift(<EditAction key="edit" onEdit={() => {ss.editSnippet(resource.id, resource.content)}}></EditAction>)
                actions.push(<ExpandedAction key="expanded" expanded={expanded} toggle={()=> rs.toggle(resource.id)}></ExpandedAction>)
                break
            default:
                rows = [<div key={resource.id}>{resource.type}</div>]
        }
        return <Preview key={resource.id} rows={rows} actions={actions} created={resource.created}></Preview>        
    })
    return (<ResourceList
        onScrollToEnd={onScrollToEnd}
    >{previews}</ResourceList>)
})
