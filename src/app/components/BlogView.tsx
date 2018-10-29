import * as React from "react"

import { withStyles, WithStyles, createStyles } from '@material-ui/core/styles'
import {Dialog, DialogContent} from '@material-ui/core'

const styles = createStyles({
    dialog: {
        flexDirection: 'column',
        justifyContent: "flex-start"
    },
    paper: {
        width: 1008,
        height: 960,
        marginTop: 24
    },
    widget: {
        width: 960,
        height: 840,
        boxSizing: 'border-box',
        margin: 'auto',
        overflowY: 'scroll',
        '::-webkit-scrollbar': {
            display: 'none'
        }
    }
})

interface Props extends WithStyles<typeof styles> {
    content: string
    visible: boolean
    onClose():void
}

export default withStyles(styles)((props:Props) => {
    let classes = props.classes
    return (
        <Dialog 
            open={props.visible} 
            onClose={props.onClose} 
            maxWidth="lg" 
            classes={{root: classes.dialog, paper: classes.paper}}
        >
            <DialogContent >
                <div className={classes.widget}>
                    <div dangerouslySetInnerHTML={{__html: props.content}}></div>
                </div>
            </DialogContent>
        </Dialog>
    )
})
