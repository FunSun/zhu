import React from "react"
import { makeStyles } from '@material-ui/styles'
import { Dialog, DialogContent, } from '@material-ui/core'

const useStyles = makeStyles({
    dialog: {
        width: 720
    },
    textField: {
        lineHeight: 1.4
    }
})

interface Props  {
    visible: boolean
    onClose():void
    children: React.ReactChild
}

export default function (props: Props) {
    const classes = useStyles()

    return <Dialog 
        open={props.visible}
        onClose={props.onClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        maxWidth="md"
    >
        <DialogContent className={classes.dialog}>
            {props.children}
        </DialogContent>
    </Dialog>
}
