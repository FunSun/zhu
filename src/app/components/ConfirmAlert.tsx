import React from 'react'
import { makeStyles } from '@material-ui/styles'

import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from '@material-ui/core'

const useStyles = makeStyles({
    content: {
        width: 480
    }
})

interface Props {
    visible: boolean
    title: string
    desc: string
    onCancel():void
    onConfirm():void
}

export default  function (props: Props) {
    const classes = useStyles()
    return (<Dialog
        open={props.visible}
        onClose={props.onCancel}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
    >
        <DialogTitle id="alert-dialog-title">{props.title}</DialogTitle>
        <DialogContent className={classes.content}>
            <DialogContentText id="alert-dialog-description">
                {props.desc}
            </DialogContentText>
        </DialogContent>
        <DialogActions>
            <Button onClick={props.onCancel}>
                取消
            </Button>
            <Button onClick={props.onConfirm} color="secondary" autoFocus>
                确认
            </Button>
        </DialogActions>
    </Dialog>)
}
