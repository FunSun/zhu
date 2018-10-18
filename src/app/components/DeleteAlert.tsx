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
    onCancel():void
    onDelete():void
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
        <DialogTitle id="alert-dialog-title">{"确认删除?"}</DialogTitle>
        <DialogContent className={`${dialogStyle}`}>
          <DialogContentText id="alert-dialog-description">
            你确定要删除这个条目吗？
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={props.onCancel}>
            取消
          </Button>
          <Button onClick={props.onDelete} color="secondary" autoFocus>
            删除
          </Button>
        </DialogActions>
      </Dialog>)
}

