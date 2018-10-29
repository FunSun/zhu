import * as React from "react"
import * as _ from 'lodash'

import {ZhihuPreview, BlogPreview, LinkPreview, CommentPreview, ArticlePreview} from "./Previews"

interface Props {
    resources: any[]
    onShowArticle(resource:any):void
    onShowBlog(resource:any):void    
    onEditArticle(id:string, content:string):void
    onLabel(id:string, tags:string[]):void
    onScrollToEnd():void
    onTagClicked(tag:string):void
    onDelete(id:string):void
}

export default class ResourceList extends React.Component<Props> {
    ref: any
    state = {
        height: 0
    }
    constructor(props:Props) {
        super(props)
        this.ref = React.createRef()
        this.state.height = window.innerHeight - 64
    }

    componentDidMount() {
        let node = this.ref.current as HTMLElement
        window.addEventListener('resize', this.handleResize.bind(this), false)
        node.addEventListener('scroll', this.handleScroll.bind(this), false)
    }

    componentWillUnmount() {
        let node = this.ref.current as HTMLElement        
        window.removeEventListener('resize', this.handleResize.bind(this), false)
        node.removeEventListener('scroll', this.handleScroll.bind(this), false)
    }
    
    handleResize() {
        this.setState({height: window.innerHeight - 64})
    }

    handleScroll() {
        let node = this.ref.current as HTMLElement
        if ((node.scrollHeight - node.scrollTop) === this.state.height) {
            this.props.onScrollToEnd()
        }
    }

    render() {
        let props = this.props
        let previews = _.map(props.resources, (resource) => {
            resource = Object.assign({}, resource, {
                'onTagClicked': this.props.onTagClicked,
                "onDelete": this.props.onDelete
            })
            let onLabel = () => {props.onLabel(resource.id, resource.tags)}
            switch (resource.type) {
                case 'zhihu':
                    return <ZhihuPreview key={resource.id} onLabel={onLabel} {...resource}></ZhihuPreview>
                case 'blog':
                return <BlogPreview 
                    key={resource.id} 
                    onLabel={onLabel} {...resource}
                    onClick={()=>{props.onShowBlog(resource)}}
                ></BlogPreview>
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
        return (<div ref={this.ref} style={{overflowY: 'scroll', width:'100%', height: this.state.height, paddingTop: 30, paddingBottom:30, display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
            {previews}
        </div>)
    }

}
