import React from "react"
import { makeStyles } from '@material-ui/styles'

import {Dialog, DialogContent} from '@material-ui/core'

import PageX from './PageX'

const useStyles = makeStyles({
    dialog: {
        flexDirection: 'column',
        justifyContent: "flex-start"
    },
    paper: {
        width: 1008,
        marginTop: 24,
        maxHeight: 'none'
    }
})

interface Props {
    content: string
    visible: boolean
    onClose():void
}

export default function (props:Props) {
    let classes = useStyles()
    return (
        <Dialog 
            open={props.visible} 
            onClose={props.onClose} 
            maxWidth="lg" 
            classes={{root: classes.dialog, paper: classes.paper}}
        >
            <DialogContent>
                <PageX width={960} height={'85vh'} content={props.content}></PageX>
            </DialogContent>
        </Dialog>
    )
}
