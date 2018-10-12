import * as React from "react"
import * as _ from 'lodash'
import {ZhihuPreview, LinkPreview, CommentPreview, ArticlePreview} from "./Previews"

interface Props {
    resources: any[]
    onShowArticle(resource:any):void
    onEditArticle(id:string, content:string):void
    onLabel(id:string, tags:string[]):void
}

export default function (props:Props) {
    let previews = _.map(props.resources, (resource) => {
        let onLabel = () => {props.onLabel(resource.id, resource.tags)}
        switch (resource.type) {
            case 'zhihu':
                return <ZhihuPreview onLabel={onLabel} title={resource.title} link={resource.from} desc={resource.highlight}></ZhihuPreview>
            case 'link':
                return <LinkPreview onLabel={onLabel} title={resource.title} link={resource.from} favicon={resource.favicon}></LinkPreview>
            case 'comment':
                return <CommentPreview created={resource.created} onLabel={onLabel} content={resource.content}></CommentPreview>
            case 'article':
                return <ArticlePreview 
                    onEdit={()=> {props.onEditArticle(resource.id, resource.content)}} 
                    onClick={()=>{props.onShowArticle(resource)}} 
                    onLabel={onLabel} title={resource.title} 
                    content={resource.content} 
                    desc={resource.highlight}
                ></ArticlePreview>
        }
        return <ZhihuPreview onLabel={onLabel} title={resource.title} link={resource.from} desc={resource.highlight}></ZhihuPreview>
    })
    return (<div style={{width:'100%', paddingTop: 30, paddingBottom:30, display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
        {previews}
    </div>)
}


