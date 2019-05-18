import React from "react"
import { makeStyles, createStyles } from '@material-ui/styles'
import { Theme } from '@material-ui/core/styles'
import * as _ from 'lodash'
import {BasicBlockType, PageBlock} from '../lib/pagex'
import Latex from  './Latex'
import {Collapse} from '@material-ui/core'
import markdownStyle from './markdownStyle'

const useStyles = makeStyles((theme:Theme) => createStyles({
  root: {
    width: '100%',
    marginLeft: 24,
    marginRight: 24,
    marginTop: 16,
    '& > article': {
      overflowY: 'auto',
      width: '98%',
      marginLeft: 16,
      height: '100%',
      '::-webkit-scrollbar': {
        display: 'none'
      }
    }
  },
  favicon: {
    width: 16,
    height: 16,
    marginRight: 10
  },
  frame: {
    backgroundColor: '#ffffff',
    boxShadow: theme.shadows[1],
    width: 800,
    boxSizing: 'border-box',
    marginBottom: 8,
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
  link_heading: {
    fontSize: '18 !important',
    marginTop:-4,
    marginBottom: -4
  },
  link_anchor: {
    color: '#1a1a1a !important',
    textDecoration: 'none',
    ":hover": {
      color: '#175199 !important',
      textDecoration: 'none !important'
    }
  }

}))

function blockToReact(block:PageBlock, classes: any):React.ReactElement {
  switch(block.type) {
    case BasicBlockType.FencedBlock:
      if (block.data.meta === 'latex') {
        return <Latex>{block.data.raw}</Latex>
      } 
      return <pre><code>{block.data.raw}</code></pre>
    case BasicBlockType.Heading:
      return React.createElement('h'+block.data.lvl.toString(), {}, block.data.title)
    case BasicBlockType.Paragraph:
      return <p>
      { _.flatMap((block.data as string).split("\n"), (o) => {return [<span>{o}</span>,<br></br>]})}
      </p>
    case BasicBlockType.ThermaticBreak:
      return <hr></hr>
    case 'link': 
      let data = block.data
      let favicon = (<img src={data.favicon}></img>)
      let title = (<a className={classes.link_anchor} href={data.from} target='_blank' title={data.title}>{data.title}</a>)
      return (<h4 className={classes.link_heading}>
          <span className={classes.favicon}>{favicon}</span>
          <span>{title}</span>
      </h4>)
    case 'tags':
      return <div></div>
    default: 
      return <pre><code>{JSON.stringify(block.data)}</code></pre>
  }
}

export default function (props:{
  blocks: PageBlock[]
  expanded: boolean
  onEdit: () => void
  toggle: () => void
  created: number
}) {
  let classes = useStyles()
  return (
    <div className={classes.frame}>
      <Collapse
          in={props.expanded}
          collapsedHeight="66px"
      >
        <div className={classes.root}>
          <style type="text/css">
            {markdownStyle}
          </style>
          <article className="markdown-body">
            {_.map(props.blocks, (block)=> blockToReact(block, classes))}
          </article>
        </div>
      </Collapse>
      <div className={classes.actions}>
        <span className={classes.action} onClick={props.onEdit}>编辑</span>
        <span className={classes.action} onClick={props.toggle}>{props.expanded?"折叠":"展开"}</span>
        <span className={classes.time}>{props.created?(new Date(props.created).toLocaleString()):""}</span>
      </div>
    </div>
  )
}
