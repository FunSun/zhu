import React from "react"
import { makeStyles } from '@material-ui/styles'

import {Dialog, DialogContent} from '@material-ui/core'

const useStyles = makeStyles({
    dialog: {
        flexDirection: 'column',
        justifyContent: "flex-start"
    },
    paper: {
        width: 1008,
        marginTop: 24,
        maxHeight: 'none'  
    },
    widget: {
        width: 960,
        height: '85vh',
        margin: 'auto',
        overflowY: 'auto',
        '::-webkit-scrollbar': {
            display: 'none'
        }
    }
})

interface Props {
    content: string
    visible: boolean
    onClose():void
}

export default function (props:Props) {
    const classes = useStyles()
    return (
        <Dialog 
            open={props.visible} 
            onClose={props.onClose} 
            maxWidth="lg" 
            classes={{root: classes.dialog, paper: classes.paper}}
        >
            <DialogContent>
                    <div className={classes.widget} dangerouslySetInnerHTML={{__html: props.content}}></div>
            </DialogContent>
        </Dialog>
    )
}
