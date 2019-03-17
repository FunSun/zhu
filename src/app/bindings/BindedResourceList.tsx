import React from "react"
import * as _ from 'lodash'
import {bind, BindingProps} from './base'
import ResourceList from '../components/ResourceList'
import {Preview, EditAction, LabelAction, DeleteAction, LinkRow, SnippetRow} from '../components/Previews'
import { FormTextArea } from "semantic-ui-react";

function bindPreview(props:BindingProps, resource:any) {
    let rs = props.resource
    let us = props.ui
    let rows = null
    // onTag={() => {rs.addTagToQuery(resource.tags)}}
    let actions = [
        <LabelAction onLabel={() => {us.showEditTagModal(resource.id, resource.tags)}}></LabelAction>,
        <DeleteAction onDelete={() => {
            alert("暂时禁用")
            // us.showConfirmAlert(DeleteResourceConfirmTitle, DeleteResourceConfirmDesc, () => {
            //     rs.deleteResource(resource.id)
        }
        }></DeleteAction>
    ]

    switch(resource.type) {
        case 'link':
            rows = [<LinkRow 
                favicon={resource.favicon}
                from={resource.from}
                title={resource.title}
            ></LinkRow>]
            break
        case 'snippet':
            rows = [<SnippetRow content={resource.content}></SnippetRow>]
            break
        default:
            rows = [<div>{resource.type}</div>]
    }
    // switch (resource.type) {
    //     case 'zhihu':
    //         return <ZhihuPreview key={resource.id} onLabel={onLabel} {...resource}></ZhihuPreview>
    //     case 'blog':
    //     return <BlogPreview 
    //         key={resource.id} 
    //         onLabel={onLabel} {...resource}
    //         onClick={()=>{us.showBlogView(resource)}}
    //     ></BlogPreview>
    //     case 'link':
    //         return <LinkPreview key={resource.id} onLabel={onLabel} {...resource}></LinkPreview>
    //     case 'comment':
    //         return <CommentPreview key={resource.id} onLabel={onLabel} {...resource}></CommentPreview>
    //     case 'snippet':
    //         return <SnippetPreview key={resource.id} onEdit={()=>{us.editSnippet(resource.id, resource.content)}} onLabel={onLabel} {...resource}></SnippetPreview>
    //     case 'article':
    //         return <ArticlePreview 
    //             key={resource.id} 
    //             onEdit={()=> {es.editArticle(resource.id, resource.content)}} 
    //             onClick={()=>{us.showArticleView(resource)}} 
    //             {...resource}
    //             onLabel={onLabel} title={resource.title} 
    //         ></ArticlePreview>
    // }
    return <Preview key={resource.id} rows={rows} actions={actions} created={resource.created}></Preview>
}

export default bind((props:BindingProps) => {
    // explicit declare dependency on inner structure
    let resources = props.resource.resources
    resources.length
    console.log(resources[0])
    props.resource.resources.length
    let onScrollToEnd = () => {props.resource.loadMore()}

    let previews = _.map(resources, bindPreview.bind(null, props))

    return (<ResourceList
        onScrollToEnd={onScrollToEnd}
    >{previews}</ResourceList>)
})
