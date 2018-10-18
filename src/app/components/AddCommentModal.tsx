import * as React from "react"
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import TextField from '@material-ui/core/TextField'
import { withStyles, WithStyles } from '@material-ui/core/styles'

const styles = {
    dialog: {
        width: 720
    },
    textField: {
        lineHeight: 1.4
    }
}
// 较了半天劲, 最后还是向withStyle妥协了。哎。。  不过还是挺好用的
interface Props extends WithStyles {
    visible: boolean
    onSubmit(content:string):void
    onClose():void
}

class AddCommentModal extends React.Component<Props> {
    state: {
        content: ""
    }
    handleSubmit() {
        this.props.onSubmit(this.state.content)
        this.props.onClose()
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
                <Button onClick={() => {this.handleSubmit()}} color="secondary" autoFocus>
                    提交
                </Button>
            </DialogActions>
        </Dialog>
    }
}

export default withStyles(styles)(AddCommentModal)