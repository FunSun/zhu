import * as React from "react"
import {css} from 'glamor'

const frameStyle = css({
    backgroundColor: '#ffffff',
    width: 700,
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 16,
    paddingBottom: 16,
    margin: 8,
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
    "& .edit": {
        float: 'right',
        fontSize: 14,
        marginRight: 30,
        color: '#91d5ff',
        "&:hover": {
            cursor: 'pointer'
        }
    },
    "& .desc": {
        marginTop: 6,
        marginBottom: 10,
        color: '#1a1a1a',
        fontSize: 15
    }
})

interface PreviewFrameworkProps {
    onEdit: () => void
    favicon?: React.ReactNode
    title?: React.ReactNode
    desc?: React.ReactNode
}

function PreviewFramework(props:PreviewFrameworkProps) {
    return (
        <div {...frameStyle}>
            <div>
    
                <h2>
                    <span className="favicon">
                        {props.favicon || (<span></span>)}
                    </span>
                    <span>
                        {props.title|| (<span></span>)}
                    </span>
                    <span className="edit" onClick={props.onEdit}>编辑</span>
                </h2>
            </div>
            <div className="desc">
                {props.desc || <span></span>}
            </div>
        </div>
    )

}

interface FamousePreviewProps {
    title: string
    link: string
    onEdit: () => void
}

interface ZhihuPreviewProps extends  FamousePreviewProps {
    desc: string
}

export function ZhihuPreview(props:ZhihuPreviewProps) {
    let title = (<a  href={props.link} target='_blank'>{props.title}</a>)
    let desc = (<div dangerouslySetInnerHTML={{'__html': props.desc}}></div>)
    return (<PreviewFramework onEdit={props.onEdit} title={title} desc={desc}></PreviewFramework>)
}



interface LinkPreviewProps extends FamousePreviewProps {
    favicon: string
}

export function LinkPreview(props:LinkPreviewProps) {
    let favicon = (<img src={props.favicon}></img>)
    let title = (<a href={props.link} target='_blank'>{props.title}</a>)

    return <PreviewFramework onEdit={props.onEdit} favicon={favicon} title={title}></PreviewFramework>
}
