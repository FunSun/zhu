import React from 'react'
import { makeStyles, createStyles } from '@material-ui/styles'
import { Theme } from '@material-ui/core/styles'

import {IconButton, Typography} from '@material-ui/core'
import CommentIcon from '@material-ui/icons/ChatBubbleOutline'

const useStyles = makeStyles((theme:Theme) => createStyles({
    root: {
        position: 'relative',
        width: '100%',
        borderBottomStyle: 'solid',
        borderBottomColor: '#e2e2e2',
        borderBottomWidth: '1px',
        backgroundColor: '#ffffff',
        height: 48
    },
    toolbar: {
        width: 1024,
        height: '100%',
        position: "absolute",
        left: 227,
        margin: 'auto',
        paddingLeft: 16,
        paddingRight: 16
    },
    logo: {
        height: '100%',
        position: 'absolute',
        width: 129,
        marginTop: 10
    },
    search: {
        height: '100%',
        position: 'absolute',
        width: 428,
        left: 149
    },
    searchInput: {
        height: 32,
        marginTop: 8,
        borderColor: '#e2e2e2',
        borderStyle: 'solid',
        borderWidth: 1,
        paddingLeft: 12
    },
    btn: {
        height: '100%',
        position: 'absolute',
        width: 279,
        left: 746,
        color: '#3b5fc0'
    },
    newBtn: {
        position: 'absolute',
        right: 0
    }
}))

interface Props {
    query: string
    onCommentIconClicked():void
    onEditIconClicked():void
    onQueryChange(val:string):void
    onSubmit():void
}

export default function (props:Props) {
    const classes = useStyles()
    return (
    <div className={classes.root}>
        <div className={classes.toolbar}>
            <Typography className={classes.logo} variant="h5" color="inherit" noWrap>
                ZHU
            </Typography>
            <div className={classes.search}>
                <input className={classes.searchInput} 
                    value={props.query}
                    onChange={(e) => {props.onQueryChange(e.target.value)}}
                    onKeyDown={(e)=>{(e.key==='Enter'?props.onSubmit():null)}}
                />
            </div>
            
            <div className={classes.btn}>
                <IconButton color="inherit" className={classes.newBtn} onClick={props.onCommentIconClicked}><CommentIcon /></IconButton>
            </div>
        </div>
    </div>)
}

