import * as React from "react"
import * as _ from 'lodash'
import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import RestoreIcon from '@material-ui/icons/Restore'
import DeleteIcon from '@material-ui/icons/Delete'
import Button from '@material-ui/core/Button'
import DialogActions from '@material-ui/core/DialogActions'


import { withStyles, WithStyles, createStyles, Theme } from '@material-ui/core/styles'
import { List, ListItem, ListItemText, ListItemSecondaryAction, IconButton } from "@material-ui/core"

const styles = (theme:Theme) => createStyles({
    dialog: {
        width: 480,
        height: 320,
    }
})

interface Props extends WithStyles<typeof styles> {
    visible: boolean
    backups: any[]
    onAddBackup():void
    onRestore(id:string):void
    onDelete(id: string):void
    onClose():void
}

export default withStyles(styles)((props:Props) => {
    let classes = props.classes
    return <Dialog 
        open={props.visible}
        onClose={props.onClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
    >
        <DialogTitle id="alert-dialog-title">{"备份"}</DialogTitle>
        <DialogContent className={classes.dialog}>
            <List>
                {_.map(props.backups, (backup)=> {
                    return <ListItem>
                        <ListItemText primary={backup.snapshot} secondary={backup.start_time}/>
                        <ListItemSecondaryAction>
                            <IconButton><RestoreIcon onClick={()=>{props.onRestore(backup.snapshot)}}/></IconButton>
                            <IconButton><DeleteIcon onClick={()=>{props.onDelete(backup.snapshot)}}/></IconButton>
                        </ListItemSecondaryAction>

                    </ListItem>
                })}
            </List>
        </DialogContent>
        <DialogActions>
            <Button onClick={props.onAddBackup}>
                添加
            </Button>
            <Button onClick={props.onClose}>
                关闭
            </Button>
        </DialogActions>
    </Dialog>
})