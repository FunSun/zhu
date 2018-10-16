import * as React from 'react'

import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import { fade } from '@material-ui/core/styles/colorManipulator'
import SearchIcon from '@material-ui/icons/Search'
import ArticleIcon from '@material-ui/icons/Edit'
import AddIcon from '@material-ui/icons/AddCircle'
import CommentIcon from '@material-ui/icons/ChatBubbleOutline'
import { createMuiTheme } from '@material-ui/core/styles'
import InputBase from '@material-ui/core/InputBase'
import {css} from 'glamor'

let theme = createMuiTheme()

const styles = {
  root: css({
    width: '100%',
  }),
  grow: css({
    flexGrow: 1,
  }),
  menuButton: css({
    marginLeft: -12,
    marginRight: 20,
  }),
  title: css({
    flexGrow: 1,
  }),
  search: css({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing.unit * 2,
    marginLeft: 0,
    width: 280,
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing.unit * 3,
      width: 'auto',
    },
    flexGrow: 2
  }),
  searchIcon: css({
    width: theme.spacing.unit * 9,
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }),
  inputRoot: css({
    color: 'inherit',
    width: '100%',
  }),
  inputInput: css({
    paddingTop: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 10,
    transition: theme.transitions.create('width'),
    width: '100%',
  }),
  sectionDesktop: css({
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  }),
  sectionMobile: css({
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  }),
}

interface Props {
  query: string
  onCommentIconClicked():void
  onEditIconClicked():void
  onAddIconClicked():void
  onQueryChange(val:string):void
  onSubmit():void
}

export default function (props:Props) {
    return (
    <div {...styles.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography {...styles.title} variant="h6" color="inherit" noWrap>
            Archiver's View
          </Typography>
          <div {...styles.search}>
            <div {...styles.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              {...css(styles.inputRoot, styles.inputInput)}
              value={props.query}
              onChange={(e) => {props.onQueryChange(e.target.value)}}
              onKeyDown={(e)=>{(e.key==='Enter'?props.onSubmit():null)}}
            />
          </div>
          <div {...styles.grow} />
          <div {...styles.sectionDesktop}>
            <IconButton color="inherit" onClick={props.onCommentIconClicked}><CommentIcon /></IconButton>
            <IconButton color="inherit" onClick={props.onEditIconClicked}><ArticleIcon /></IconButton>
            <IconButton color="inherit" onClick={props.onAddIconClicked}><AddIcon /></IconButton>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  )
}

