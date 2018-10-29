import * as React from "react"
import * as _ from 'lodash'

import { withStyles, WithStyles, createStyles, Theme } from '@material-ui/core/styles'
import { 
    Button,
    Dialog, DialogTitle, DialogContent, DialogActions,
    List, ListItem, ListItemText, ListItemSecondaryAction,
    IconButton 
} from "@material-ui/core"
import RestoreIcon from '@material-ui/icons/Restore'
import DeleteIcon from '@material-ui/icons/Delete'

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