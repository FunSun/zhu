import * as React from "react"
import { createMuiTheme } from '@material-ui/core/styles'
import {css} from 'glamor'
import * as _ from 'lodash'
import Chip from '@material-ui/core/Chip'

let theme = createMuiTheme()

const frameStyle = css({
    backgroundColor: '#ffffff',
    boxShadow: theme.shadows[1],
    width: 800,
    boxSizing: 'border-box',
    marginBottom: 8,
    "& .content": {
        marginLeft: 24,
        marginRight: 24,
        marginTop: 16,
    },
    "& a": {
        color: '#1a1a1a',
        textDecoration: 'none',
        ":hover": {
            color: '#175199',
            textDecoration: 'none'
        }
    },
    "& .favicon": {
        width: 16,
        height: 16,
        marginRight: 10
    },

    "& h2": {
        fontSize: 18,
        marginTop:-4,
        marginBottom: -4
    },
    "& em": {
        backgroundColor: 'yellow',
        fontStyle: 'normal'
    },
    "& .desc": {
        marginTop: 6,
        marginBottom: 10,
        color: '#1a1a1a',
        fontSize: 15
    },
    "& .actions": {
        marginLeft: 16
    },
    '& .action': {
        boxSizing: 'border-box',
        display: 'inline-block',
        padding: 8,
        height: 40,
        margin:8,
        marginLeft:8,
        marginTop: 0,
        color: theme.palette.secondary.main,
        cursor: 'pointer'
    },
    '& .time': {
        boxSizing: 'border-box',
        display: 'inline-block',
        padding: 8,
        height: 40,
        margin:8,
        marginLeft:8,
        marginTop: 0,
        color: theme.palette.grey[500],
        float: 'right'
    },
    '& .tags': {
        marginTop: 8,
        '& *': {
            WebkitUserSelect: 'text !important'
        }
    }
})

interface BaseProps {
    id: string
    tags: string[]
    created: number
    onTagClicked(tag:string):void
    onDelete(id: string):void
}

interface PreviewFrameworkProps extends BaseProps{
    onLabel: () => void
    onClick?: () => void
    onEdit?: () => void
    favicon?: React.ReactNode
    title?: React.ReactNode
    desc?: React.ReactNode
}

function PreviewFramework(props:PreviewFrameworkProps) {
    return (
        <div {...frameStyle}>
            <div className="content">
    
                <h2>
                    <span className="favicon">
                        {props.favicon || (<span></span>)}
                    </span>
                    <span>
                        {props.title|| (<span></span>)}
                    </span>

                </h2>
                <div className="tags">
                    {
                        _.map(props.tags, (tag) => {
                            return <span style={{marginRight: 8, float: 'right'}}><Chip onClick={()=>{props.onTagClicked(tag)}} label={tag} color="default"></Chip></span>
                        })
                    }
                    <div style={{clear: 'both'}}></div>
                </div>
                <div className="desc">
                {props.desc || <span></span>}
            </div>
            </div>
            <div className="actions">
                <span className="action" onClick={props.onLabel}>标记</span>
                <span className="action" onClick={props.onClick}>显示</span>
                <span className="action" onClick={props.onEdit}>编辑</span>
                <span className="action" onClick={() => {props.onDelete(props.id)}}>删除</span>
                <span className="time">{props.created?(new Date(props.created).toLocaleString()):""}</span>
            </div>
        </div>
    )

}

interface FamousePreviewProps extends BaseProps {
    title: string
    from: string
    onLabel: () => void
}

interface ZhihuPreviewProps extends  FamousePreviewProps {
    id: string
    highlight: string
    tags: string[]
    created: number
}

export function ZhihuPreview(props:ZhihuPreviewProps) {
    let title = (<a  href={props.from} target='_blank'>{props.title}</a>)
    let desc = (<div dangerouslySetInnerHTML={{'__html': props.highlight}}></div>)
        return (<PreviewFramework {...Object.assign({}, props, {title, desc})} id={props.id} onLabel={props.onLabel}></PreviewFramework>)
}



interface LinkPreviewProps extends FamousePreviewProps {
    from: string
    favicon: string
}

export function LinkPreview(props:LinkPreviewProps) {
    let favicon = (<img src={props.favicon}></img>)
    let title = (<a href={props.from} target='_blank' title={props.from}>{props.title}</a>)

    return <PreviewFramework {...Object.assign({}, props, {favicon, title})} onLabel={props.onLabel}></PreviewFramework>
}

interface CommentPreviewProps extends BaseProps {
    content: string
    onLabel: () => void
}
export function CommentPreview(props:CommentPreviewProps) {
    return <PreviewFramework {...Object.assign({}, props, {desc: props.content})} onLabel={props.onLabel}></PreviewFramework>
}

interface ArticlePreviewProps extends BaseProps {
    title: string
    content: string
    highlight: string,
    onLabel: () => void
    onClick: () => void
    onEdit: () => void
}

export function ArticlePreview(props:ArticlePreviewProps) {
    let title = props.title
    if (title ==="" && props.content.startsWith("# ")) {
        let headline = _.split(props.content, '\n')[0]
        title = _.trimStart(headline, '# ')
    }
    
    let desc = (<div  dangerouslySetInnerHTML={{'__html': props.highlight}}></div>)
    return (<PreviewFramework {...Object.assign({}, props, {title, desc})} onEdit={props.onEdit} onClick={props.onClick} onLabel={props.onLabel}></PreviewFramework>)
}
