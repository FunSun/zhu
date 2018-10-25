import * as React from 'react'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import {css} from 'glamor'

interface Props {
    visible: boolean
    title: string
    desc: string
    onCancel():void
    onConfirm():void
}

const dialogStyle = css({
    width: 480
})

export default function DeleteAlert(props: Props)  {
    return (<Dialog
        open={props.visible}
        onClose={props.onCancel}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{props.title}</DialogTitle>
        <DialogContent className={`${dialogStyle}`}>
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

