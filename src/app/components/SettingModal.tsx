import * as React from "react"
import TextField from '@material-ui/core/TextField'
import * as _ from 'lodash'
import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import MenuItem from '@material-ui/core/MenuItem'
import Select from '@material-ui/core/Select'
import FormControl from '@material-ui/core/FormControl'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import InputLabel from '@material-ui/core/InputLabel'
import Switch from '@material-ui/core/Switch'
import Button from '@material-ui/core/Button'
import DialogActions from '@material-ui/core/DialogActions'

import { withStyles, WithStyles, createStyles, Theme } from '@material-ui/core/styles'

const styles = (theme:Theme) => createStyles({
    dialog: {
        width: 480,
        height: 300,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-around'
    },
    switch: {
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
        </DialogContent>
        <DialogActions>
            <Button onClick={props.onClose}>
                关闭
            </Button>
        </DialogActions>
    </Dialog>
})