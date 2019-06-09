import React from "react"
import { makeStyles, createStyles } from '@material-ui/styles'
import { Theme } from '@material-ui/core/styles'
import * as _ from 'lodash'
import {BasicBlockType, PageBlock} from '../lib/pagex'
import Latex from  './Latex'
import {Collapse} from '@material-ui/core'

const useStyles = makeStyles((theme:Theme) => createStyles({
  root: {
    paddingTop: 8,  
    paddingBottom: 8
  },
  favicon: {
    width: 16,
    height: 16,
    marginRight: 10
  },
  frame: {
    borderLeftStyle: 'solid',
    borderLeftWidth: '1px',
    borderLeftColor: '#ffffff',
    paddingLeft: 13,
    position: 'relative',
    width: 1003,
    boxSizing: 'border-box',
    backgroundColor: '#ffffff',
    '&:hover': {
      borderLeftColor: '#e2e2e2',
    },
    '&:hover section': {
      display: 'block'
    }
  },
  actions: {
    position: 'absolute',
    top: 0,
    right: 0,
    display: 'none'
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
    borderRadius: 5,
    borderWidth: 2,
    paddingLeft: 12,
    paddingRight: 12,
    paddingTop: 8,
    paddingBottom: 8,
    borderStyle: 'solid',
    backgroundColor: '#e2e2e2',
    borderColor: '#e2e2e2',
    maxWidth: 640,
    display: 'inline-block'
  },
  link_anchor: {
    color: '#1a1a1a !important',
    textDecoration: 'none',
    ":hover": {
      color: '#175199 !important',
      textDecoration: 'none !important'
    }
  },
  fold: {
    backgroundColor: '#e4f0fb'
  },
  expand: {
    backgroundColor: '#ffffff'
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
      return React.createElement('h'+block.data.lvl.toString(), {style: {maxWidth: 640}}, block.data.title)
    case BasicBlockType.Paragraph:
      return <p style={{maxWidth: 640, overflowWrap: 'break-word'}}>
      { _.flatMap((block.data as string).split("\n"), (o) => {return [<span>{o}</span>,<br></br>]})}
      </p>
    case BasicBlockType.ThermaticBreak:
      return <div></div>
    case 'link': 
      let data = block.data
      let favicon = (<img src={data.favicon}></img>)
      let title = (<a className={classes.link_anchor} href={data.from} target='_blank' title={data.title}>{data.title}</a>)
      return (<div className={classes.link_heading} >
          <span className={classes.favicon} style={{paddingTop: 8}}>{favicon}</span>
          <span>{title}</span>
      </div>)
    case 'tags':
      return <div></div>
    case 'img': {
      let data = block.data  
      return <img src={data.url}></img>
    }
    default: 
      return <pre><code>{JSON.stringify(block.data)}</code></pre>
  }
}

export default function Page (props:{
  blocks: PageBlock[]
  expanded: boolean
  onEdit: () => void
  toggle: () => void
  created: number
}) {
  let classes = useStyles()
  let needExpand = (props.blocks.length > 3)
  let actions = [<span className={classes.action} onClick={props.onEdit}>编辑</span>]
  if (needExpand) {
    actions.push(<span className={classes.action} onClick={props.toggle}>{props.expanded?"折叠":"展开"}</span>)

  }
  let expanded = !needExpand || props.expanded
  let combinedStyle = ""
  if (!expanded) {
    combinedStyle = `${classes.root} ${classes.fold}`
  } else {
    combinedStyle = `${classes.root} ${classes.expand}`
  }
  
  return (
    <div className={classes.frame} >
      <Collapse
          in={expanded}
          collapsedHeight="66px"
      >
        <div className={combinedStyle}>
          <article>
            {_.map(props.blocks, (block)=> blockToReact(block, classes))}
          </article>
        </div>
      </Collapse>
      <section className={classes.actions}>
        {actions}
      </section>
    </div>
  )
}
