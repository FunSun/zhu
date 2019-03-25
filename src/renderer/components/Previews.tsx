import React from "react"
import { makeStyles, createStyles } from '@material-ui/styles'
import { Theme } from '@material-ui/core/styles'
import * as _ from 'lodash'
import PageX from './PageX'

import {Chip, Collapse} from '@material-ui/core'

const useStyles = makeStyles((theme:Theme) => createStyles({
    frame: {
        backgroundColor: '#ffffff',
        boxShadow: theme.shadows[1],
        width: 800,
        boxSizing: 'border-box',
        marginBottom: 8,
    },
    content: {
        marginLeft: 24,
        marginRight: 24,
        marginTop: 16,
        '& h2': {
            fontSize: 18,
            marginTop:-4,
            marginBottom: -4
        },
        '& em': {
            backgroundColor: 'yellow',
            fontStyle: 'normal'
        },
        '& a': {
            color: '#1a1a1a',
            textDecoration: 'none',
            ":hover": {
                color: '#175199',
                textDecoration: 'none'
            }
        }
    },
    favicon: {
        width: 16,
        height: 16,
        marginRight: 10
    },
    desc: {
        marginTop: 6,
        marginBottom: 10,
        color: '#1a1a1a',
        fontSize: 15
    },
    actions: {
        marginLeft: 16
    },
    action: {
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
    time: {
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
    tags: {
        marginTop: 8,
    }
}))

interface BaseProps {
    id: string
    tags: string[]
    created: number
    onTagClicked(tag:string):void
    onDelete(id: string):void
}

interface PreviewFrameworkProps extends BaseProps {
    onLabel: () => void
    onClick?: () => void
    onEdit?: () => void
    favicon?: React.ReactNode
    title?: React.ReactNode
    desc?: React.ReactNode
}

const PreviewFramework = (props:PreviewFrameworkProps) => {
    let classes = useStyles()
    return (
        <div className={classes.frame}>
            <div className={classes.content}>
    
                <h2>
                    <span className={classes.favicon}>
                        {props.favicon || (<span></span>)}
                    </span>
                    <span>
                        {props.title|| (<span></span>)}
                    </span>

                </h2>
                <div className={classes.tags}>
                    {
                        _.map(props.tags, (tag) => {
                            return <span style={{marginRight: 8, float: 'right'}}><Chip onClick={()=>{props.onTagClicked(tag)}} label={tag} color="default"></Chip></span>
                        })
                    }
                    <div style={{clear: 'both'}}></div>
                </div>
                <div className={classes.desc}>
                {props.desc || <span></span>}
            </div>
            </div>
            <div className={classes.actions}>
                <span className={classes.action} onClick={props.onLabel}>标记</span>
                <span className={classes.action} onClick={props.onClick}>显示</span>
                <span className={classes.action} onClick={props.onEdit}>编辑</span>
                <span className={classes.action} onClick={() => {props.onDelete(props.id)}}>删除</span>
                <span className={classes.time}>{props.created?(new Date(props.created).toLocaleString()):""}</span>
            </div>
        </div>
    )
}

interface PreviewProps {
    rows: React.ReactNode[]
    actions: React.ReactNode[]
    created: number
}

export function Preview(props:PreviewProps) {
    let classes = useStyles()
    return (
        <div className={classes.frame}>
            <div className={classes.content}>
                {props.rows}
            </div>
            <div className={classes.actions}>
                {props.actions}
                <span className={classes.time}>{props.created?(new Date(props.created).toLocaleString()):""}</span>
            </div>
        </div>
    )
}

interface EditActionProps {
    onEdit: () => void
}

export function EditAction (props: EditActionProps) {
    let classes = useStyles()
    return <span className={classes.action} onClick={props.onEdit}>编辑</span>
}

export function ExpandedAction(props: {
    expanded: boolean
    toggle: () => void
}) {
    let classes = useStyles()
    return <span className={classes.action} onClick={props.toggle}>{props.expanded?"折叠":"展开"}</span>
}

interface LabelActionProps {
    onLabel: () => void
}

export function LabelAction(props:LabelActionProps) {
    let classes = useStyles()
    return <span className={classes.action} onClick={props.onLabel}>标记</span>
}

interface DeleteActionProps {
    onDelete: () => void
}

export function DeleteAction(props:DeleteActionProps) {
    let classes = useStyles()
    return <span className={classes.action} onClick={props.onDelete}>删除</span>
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

interface LinkRowProps {
    from: string
    favicon: string
    title: string
}

export function LinkRow(props:LinkRowProps) {
    let classes = useStyles()
    let favicon = (<img src={props.favicon}></img>)
    let title = (<a href={props.from} target='_blank' title={props.from}>{props.title}</a>)
    return (<h2>
        <span className={classes.favicon}>{favicon}</span>
        <span>{title}</span>
    </h2>)
}

interface LinkRowProps {
    from: string
    favicon: string
    title: string
}
export function PageXRow(props: {
    expanded: boolean
    content: string
}) {
    return <Collapse
        in={props.expanded}
        collapsedHeight="66px"
    >
        <PageX content={props.content}></PageX>    
    </Collapse>
    
}