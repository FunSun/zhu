import * as React from "react"

import { createStyles, withStyles, WithStyles, } from '@material-ui/core/styles'
import {Button, Dialog, DialogContent, DialogActions, TextField} from '@material-ui/core'

const styles = createStyles({
    dialog: {
        width: 720
    },
    textField: {
        lineHeight: 1.4
    }
})

interface Props extends WithStyles<typeof styles> {
    visible: boolean
    onSubmit(content:string):void
    onClose():void
}

export default withStyles(styles)(class AddCommentModal extends React.Component<Props> {
    state: {
        content: ""
    }
    render () {
        let classes = this.props.classes
        return <Dialog 
            open={this.props.visible}
            onClose={this.props.onClose}
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
                    onChange={(e)=>{this.setState({content:e.target.value})}}
                    ></TextField>                 
            </DialogContent>
            <DialogActions>
                <Button onClick={this.props.onClose}>
                   取消
                </Button>
                <Button onClick={() => {this.props.onSubmit(this.state.content)}} color="secondary" autoFocus>
                    提交
                </Button>
            </DialogActions>
        </Dialog>
    }
})
