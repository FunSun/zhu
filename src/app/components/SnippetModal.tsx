import React from "react"
import { makeStyles } from '@material-ui/styles'
import { Dialog, DialogContent, } from '@material-ui/core'
import SlateEditor from "./SlateEditor"


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
    content: string
    onSubmit(content:string):void
    onClose():void
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
            <SlateEditor value={props.content} onSave={props.onSubmit}></SlateEditor>
        </DialogContent>
    </Dialog>
}

