import * as React from "react"
import { createMuiTheme } from '@material-ui/core/styles'
import {css} from 'glamor'
import * as _ from 'lodash'


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
    }
})

interface PreviewFrameworkProps {
    created?: number
    onLabel: () => void
    onClick?: () => void
    onEdit?: () => void
    favicon?: React.ReactNode
    title?: React.ReactNode
    desc?: React.ReactNode
}

function PreviewFramework(props:PreviewFrameworkProps) {
    return (
        <div {...frameStyle} >
            <div className="content">
    
                <h2>
                    <span className="favicon">
                        {props.favicon || (<span></span>)}
                    </span>
                    <span>
                        {props.title|| (<span></span>)}
                    </span>

                </h2>
                <div className="desc">
                {props.desc || <span></span>}
            </div>
            </div>
            <div className="actions">
                <span className="action" onClick={props.onLabel}>标记</span>
                <span className="action" onClick={props.onClick}>显示</span>
                <span className="action" onClick={props.onEdit}>编辑</span>
                <span className="time">{props.created?(new Date(props.created).toLocaleString()):""}</span>
            </div>
        </div>
    )

}

interface FamousePreviewProps {
    title: string
    link: string
    onLabel: () => void
}

interface ZhihuPreviewProps extends  FamousePreviewProps {
    desc: string
}

export function ZhihuPreview(props:ZhihuPreviewProps) {
    let title = (<a  href={props.link} target='_blank'>{props.title}</a>)
    let desc = (<div dangerouslySetInnerHTML={{'__html': props.desc}}></div>)
    return (<PreviewFramework onLabel={props.onLabel} title={title} desc={desc}></PreviewFramework>)
}



interface LinkPreviewProps extends FamousePreviewProps {
    favicon: string
}

export function LinkPreview(props:LinkPreviewProps) {
    let favicon = (<img src={props.favicon}></img>)
    let title = (<a href={props.link} target='_blank'>{props.title}</a>)

    return <PreviewFramework onLabel={props.onLabel} favicon={favicon} title={title}></PreviewFramework>
}

interface CommentPreviewProps {
    content: string
    created: string
    onLabel: () => void
}
export function CommentPreview(props:CommentPreviewProps) {
    return <PreviewFramework created={props.created} onLabel={props.onLabel} desc={props.content}></PreviewFramework>
}

interface ArticlePreviewProps {
    title: string
    content: string
    desc: string,
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
    
    let desc = (<div  dangerouslySetInnerHTML={{'__html': props.desc}}></div>)
    return (<PreviewFramework onEdit={props.onEdit} onClick={props.onClick} onLabel={props.onLabel} title={title} desc={desc}></PreviewFramework>)
}
