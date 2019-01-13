import React, {useRef, useEffect, useState} from "react"
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

export default function (props:Props) {
    const ref = useRef(null)
    const signaled = useRef(false)
    const [height, setHeight] = useState(window.innerHeight - 64)
    const handleResize = () => {
        setHeight(window.innerHeight - 64)
    }

    const handleScroll = () => {
        let node = ref.current as HTMLElement
        if ((node.scrollHeight - node.scrollTop) <= (height + 220)) {
            if (signaled.current) {
                return
            }
            signaled.current = true
            props.onScrollToEnd()
        } else {
            signaled.current = false
        }
    }

    useEffect(() => {
        if (!ref.current) {
            return () => {}
        }
        let node = ref.current as HTMLElement
        window.addEventListener('resize', handleResize, false)
        node.addEventListener('scroll', handleScroll, false)
        return () => {
            window.removeEventListener('resize', handleResize, false)
            node.removeEventListener('scroll', handleScroll, false)
    
        }
    }, [ref.current])

    let previews = _.map(props.resources, (resource) => {
        resource = Object.assign({}, resource, {
            'onTagClicked': props.onTagClicked,
            "onDelete": props.onDelete
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
    return (<div ref={ref} style={{overflowY: 'scroll', width:'100%', height: height, paddingTop: 30, paddingBottom:30, display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
        {previews}
    </div>)

}

