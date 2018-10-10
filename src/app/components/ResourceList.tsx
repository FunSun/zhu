import * as React from "react"
import { inject, observer } from "mobx-react"
import ResourceStore, {Resource} from '../stores/resourceStore'
import UIStore from '../stores/uiStore'
import * as _ from 'lodash'
import {ZhihuPreview, LinkPreview, CommentPreview, ArticlePreview} from "./Previews"

@inject('uiStore', 'resourceStore')
@observer
export default class App extends React.Component {
    constructor(props:any) {
        super(props)
    }

    handleEdit(id:string, tags: string[]) {
        let us = (this.props as any).uiStore as UIStore
        us.showEditTagModal(id, tags)
    }

    showView(r:Resource, type: string) {
        let us = (this.props as any).uiStore as UIStore        
        us.showArticleView(r)
    }

    render () {
        const rs = (this.props as any).resourceStore as ResourceStore
        let us = (this.props as any).uiStore as UIStore
        let previews = _.map(rs.resources, (resource:any) => {
            let onLabel = this.handleEdit.bind(this, resource.id, resource.tags)
            switch (resource.type) {
                case 'zhihu':
                    return <ZhihuPreview onLabel={onLabel} title={resource.title} link={resource.from} desc={resource.highlight}></ZhihuPreview>
                case 'link':
                    return <LinkPreview onLabel={onLabel} title={resource.title} link={resource.from} favicon={resource.favicon}></LinkPreview>
                case 'comment':
                    return <CommentPreview created={resource.created} onLabel={onLabel} content={resource.content}></CommentPreview>
                case 'article':
                    return <ArticlePreview onEdit={()=> {us.showArticleEditor(resource.id, resource.content)}} onClick={()=>{this.showView(resource, 'article')}} onLabel={onLabel} title={resource.title} content={resource.content} desc={resource.highlight}></ArticlePreview>
            }
            return <ZhihuPreview onLabel={onLabel} title={resource.title} link={resource.from} desc={resource.highlight}></ZhihuPreview>
        })
        return (<div style={{width:'100%', paddingTop: 30, paddingBottom:30, display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
            {previews}
        </div>)
    }
}


