import * as React from 'react'
import { inject, observer } from "mobx-react"
import ResourceStore from '../stores/resourceStore'
import UIStore from "../stores/uiStore"



import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import InputBase from './InputBase'
import { fade } from '@material-ui/core/styles/colorManipulator'
import SearchIcon from '@material-ui/icons/Search'
import ArticleIcon from '@material-ui/icons/Edit'
import AddIcon from '@material-ui/icons/AddCircle'
import CommentIcon from '@material-ui/icons/ChatBubbleOutline'
import { createMuiTheme } from '@material-ui/core/styles'
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

@inject('resourceStore', 'uiStore')
@observer
export default class extends React.Component {
  componentDidMount() {
    window.addEventListener('scroll', this.onScroll, false)
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.onScroll, false)
  }

  onScroll = () => {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
        let rs = (this.props as any).resourceStore as ResourceStore
        rs.loadMore()
    }
  }

  handleShowAddResourceModal() {
    let us = (this.props as any).uiStore as UIStore
    us.showAddBlogModal()
  }

  handleShowAddCommentModal() {
    let us = (this.props as any).uiStore as UIStore
    us.showAddCommentModal()
  }

  handleShowAddArticleModal() {
    let us = (this.props as any).uiStore as UIStore
    us.showArticleEditor()
  }

  handleSubmit(val:string) {
    let rs = (this.props as any).resourceStore as ResourceStore
    rs.reload(val)
  }

  render() {
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
                onSubmit={(v)=>{this.handleSubmit(v)}}
              />
            </div>
            <div {...styles.grow} />
            <div {...styles.sectionDesktop}>
              <IconButton color="inherit" onClick={()=>this.handleShowAddCommentModal()}><CommentIcon /></IconButton>
              <IconButton color="inherit" onClick={()=>this.handleShowAddArticleModal()}><ArticleIcon /></IconButton>
              <IconButton color="inherit" onClick={()=>this.handleShowAddResourceModal()}><AddIcon /></IconButton>
            </div>
          </Toolbar>
        </AppBar>
      </div>
    )
  }
}
