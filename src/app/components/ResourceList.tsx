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
                return <ZhihuPreview key={resource.id} onLabel={onLabel} {...resource}></ZhihuPreview>
            case 'link':
                return <LinkPreview key={resource.id} onLabel={onLabel} {...resource}></LinkPreview>
            case 'comment':
                return <CommentPreview key={resource.id} onLabel={onLabel} {...resource}></CommentPreview>
            case 'article':
                return <ArticlePreview 
                    key={resource.id} 
                    onEdit={()=> {props.onEditArticle(resource.id, resource.content)}} 
                    onClick={()=>{props.onShowArticle(resource)}} 
                    {...resource}
                    onLabel={onLabel} title={resource.title} 
                ></ArticlePreview>
        }
        return <ZhihuPreview key={resource.id} onLabel={onLabel} {...resource}></ZhihuPreview>
    })
    return (<div style={{overflowY: 'scroll', height: 890, width:'100%', paddingTop: 30, paddingBottom:30, display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
        {previews}
    </div>)
}


