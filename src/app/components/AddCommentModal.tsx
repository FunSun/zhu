import * as React from "react"
import { css } from 'glamor'
import Button from '@material-ui/core/Button'
import Modal from './Modal'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import TextField from '@material-ui/core/TextField'
import { createMuiTheme } from '@material-ui/core/styles'

const theme = createMuiTheme()

const styles = {
    dialog: css({
        width: 720
    }),
}

interface Props {
    visible: boolean
    onSubmit(content:string):void
    onClose():void
}

export default class AddResourceModal extends React.Component<Props> {
    state: {
        content: ""
    }
    handleSubmit() {
        this.props.onSubmit(this.state.content)
        this.props.onClose()
    } 
    render () {
        return <Dialog 
            open={this.props.visible}
            onClose={this.props.onClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            maxWidth="md"
        >
            <DialogContent className={`${styles.dialog}`}>
                <TextField
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