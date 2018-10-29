import * as React from 'react'

import { withStyles, WithStyles, createStyles } from '@material-ui/core/styles'
import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from '@material-ui/core'

const styles = createStyles({
  content: {
    width: 480
  }
})

interface Props extends WithStyles<typeof styles> {
    visible: boolean
    title: string
    desc: string
    onCancel():void
    onConfirm():void
}

export default  withStyles(styles)((props: Props) => {
    return (<Dialog
        open={props.visible}
        onClose={props.onCancel}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{props.title}</DialogTitle>
        <DialogContent className={props.classes.content}>
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
})
