import * as React from "react"
import * as _ from 'lodash'

import { withStyles, WithStyles, createStyles, Theme } from '@material-ui/core/styles'
import {
    Button,
    Dialog, DialogContent, DialogTitle, DialogActions,
    IconButton,
    InputLabel,
    FormControl, FormControlLabel, 
    MenuItem, 
    Select, Switch,
    TextField
} from '@material-ui/core'
import OpenInNewIcon from '@material-ui/icons/OpenInNew'

const styles = (theme:Theme) => createStyles({
    dialog: {
        width: 480,
        height: 320,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-around'
    },
    switch: {
        justifyContent: 'space-between',
        marginLeft: 0
    },
    open: {
        justifyContent: 'space-between',
        marginLeft: 0
    }
})

interface Props extends WithStyles<typeof styles> {
    visible: boolean
    server: string
    safeMode: boolean
    keybindngs: string
    onKeybindingChange(v: string):void
    onServerChange(v: string):void
    onSafeModeToggle(checked: boolean):void
    onOpenBackups():void
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
        <DialogTitle id="alert-dialog-title">{"基本设置"}</DialogTitle>        
        <DialogContent className={classes.dialog}>
            <TextField autoFocus fullWidth label={'Server'}  value={props.server} onChange={(e)=>{props.onServerChange(e.target.value)}}></TextField>
            <FormControl>
                <InputLabel htmlFor="age-simple">Key Bindings</InputLabel>
                <Select
                    onChange={(e) => {props.onKeybindingChange(e.target.value)}}
                    value={props.keybindngs}
                    fullWidth
                >
                    <MenuItem value="default">Default</MenuItem>
                    <MenuItem value="emacs">Emacs</MenuItem>
                    <MenuItem value="vim">Vim</MenuItem>
                </Select>
            </FormControl>
            <FormControlLabel
                classes={{
                    root: classes.switch
                }}
                labelPlacement="start"
                control={
                    <Switch
                    disableRipple
                    checked={props.safeMode}
                    onChange={(e, checked)=>{props.onSafeModeToggle(checked)}}
                    />
                }
                label="Safe Mode"
                />
            <FormControlLabel
                classes={{
                    root: classes.open
                }}
                labelPlacement="start"
                control={<IconButton color="inherit" onClick={props.onOpenBackups}><OpenInNewIcon /></IconButton>}
                label="Backups"
                />

        </DialogContent>
        <DialogActions>
            <Button onClick={props.onClose}>
                关闭
            </Button>
        </DialogActions>
    </Dialog>
})