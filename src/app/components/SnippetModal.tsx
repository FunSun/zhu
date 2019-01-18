import React from "react"
import { makeStyles } from '@material-ui/styles'
import { Dialog, DialogContent, } from '@material-ui/core'
import SlateEditor from "./SlateEditor"
import * as _ from 'lodash'

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
    onSubmit(content:string, tags: string[]):void
    onClose():void
}

function parseText(v: string) {
    let content = v
    let tags = ["未分类"]
    let lines = _.split(v, "\n")
    if (lines.length > 1) {
        tags = _.map(_.filter(_.split(lines[0], " "), (token) => {return token !== "" && token !== " "}), (token:string) => {
            return _.trimStart(token, '@')
        })
        content = _.join(lines.slice(1), "\n")
    }
    return {content, tags}
}

export default function (props: Props) {
    const classes = useStyles()
    const handleSave = (v: string) => {
        let {content, tags} = parseText(v)
        props.onSubmit(content, tags)
    }

    return <Dialog 
        open={props.visible}
        onClose={props.onClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        maxWidth="md"
    >
        <DialogContent className={classes.dialog}>
            <SlateEditor value="" onSave={handleSave}></SlateEditor>
        </DialogContent>
    </Dialog>
}

