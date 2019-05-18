import React from "react"
import * as _ from 'lodash'
import ResourceList from '../components/ResourceList'
import Page from '../components/Page'
import {observer} from 'mobx-react-lite'
import useResourceStr from "../stores/resource"
import useSnippetStr from "../stores/snippet"

export default observer(() => {
    // explicit declare dependency on inner structure
    let rs = useResourceStr()
    let ss = useSnippetStr()
    let resources = rs.resources
    resources.length
    let onScrollToEnd = () => {rs.loadMore()}

    let items = _.map(resources, (resource) => {
        let expanded = !!resource.expanded
        const onEdit = () => {ss.editSnippet(resource.id, resource.blocks)}
        const toggle = ()=> {rs.toggle(resource.id)}
        return <Page 
            key={resource.id} 
            expanded={expanded} 
            blocks={resource.blocks} 
            created={resource.created} 
            onEdit={onEdit} 
            toggle={toggle}
        ></Page>
    })
    return (<ResourceList
        onScrollToEnd={onScrollToEnd}
    >{items}</ResourceList>)
})
