import * as React from 'react'

import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import { fade } from '@material-ui/core/styles/colorManipulator'
import SearchIcon from '@material-ui/icons/Search'
import ArticleIcon from '@material-ui/icons/Edit'
import SettingsIcon from '@material-ui/icons/Settings'
import CommentIcon from '@material-ui/icons/ChatBubbleOutline'
import InputBase from '@material-ui/core/InputBase'
import { createStyles, withStyles, Theme, WithStyles } from '@material-ui/core/styles'

const styles = (theme:Theme) => createStyles({
  root: {
    width: '100%',
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  title: {
    flexGrow: 1,
  },
  search: {
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
  },
  searchIcon: {
    width: theme.spacing.unit * 9,
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
    width: '100%',
  },
  inputInput: {
    lineHeight: 1.4,
    paddingTop: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 10,
    transition: theme.transitions.create('width'),
    width: '100',
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  }
})

interface Props extends WithStyles<typeof styles> {
  query: string
  onCommentIconClicked():void
  onEditIconClicked():void
  onAddIconClicked():void
  onQueryChange(val:string):void
  onSubmit():void
}

export default withStyles(styles)((props:Props) => {
  let classes = props.classes
    return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography className={classes.title} variant="h6" color="inherit" noWrap>
            Archiver's View
          </Typography>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              classes={{root: classes.inputRoot, input: classes.inputInput}}
              value={props.query}
              onChange={(e) => {props.onQueryChange(e.target.value)}}
              onKeyDown={(e)=>{(e.key==='Enter'?props.onSubmit():null)}}
            />
          </div>
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            <IconButton color="inherit" onClick={props.onCommentIconClicked}><CommentIcon /></IconButton>
            <IconButton color="inherit" onClick={props.onEditIconClicked}><ArticleIcon /></IconButton>
            <IconButton color="inherit" onClick={props.onAddIconClicked}><SettingsIcon /></IconButton>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  )
})

