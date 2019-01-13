import React, {useState} from "react"
import { makeStyles } from '@material-ui/styles'
import {Button, Dialog, DialogContent, DialogActions, TextField} from '@material-ui/core'

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
    onSubmit(content:string):void
    onClose():void
}

export default function (props: Props) {
    const classes = useStyles()
    const [content, setContent] = useState("")
    return <Dialog 
        open={props.visible}
        onClose={props.onClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        maxWidth="md"
    >
        <DialogContent className={classes.dialog}>
            <TextField
                className={classes.textField}
                inputProps={{className: classes.textField}}
                rows={16}
                label="发表想法"
                autoFocus
                fullWidth
                placeholder="Something interesting!"
                multiline
                margin="normal"
                variant="outlined"
                onChange={(e)=>{setContent(e.target.value)}}
                ></TextField>                 
        </DialogContent>
        <DialogActions>
            <Button onClick={props.onClose}>
               取消
            </Button>
            <Button onClick={() => {props.onSubmit(content)}} color="secondary" autoFocus>
                提交
            </Button>
        </DialogActions>
    </Dialog>
}

