import * as React from "react"
import { css } from 'glamor'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import * as _ from 'lodash'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import Chip from '@material-ui/core/Chip'
import { createMuiTheme } from '@material-ui/core/styles'

const theme = createMuiTheme()

const styles = {
    dialog: css({
        width: 480
    }),
    root: css({
        display: 'flex',
        justifyContent: 'flex-start',
        flexWrap: 'wrap',
        marginBottom: 2*theme.spacing.unit
    }),
    chip: css({
        margin: theme.spacing.unit,
    })
}
interface Props {
    visible: boolean
    tags: string[]
    onSubmit(tags:string[]):void
    onClose():void
}

export default class AddResourceModal extends React.Component<Props> {
    state: {tags:string[], buffer: ""}
    constructor(props:Props) {
        super(props)
        this.state = {
            tags: props.tags,
            buffer: ""
        }
    }
    componentWillReceiveProps(props:Props) {
        this.setState({
            tags: props.tags
        })
    }
    handleChange(e:any) {
        this.setState({
            buffer: e.target.value
        })
    }
    handleEnter(e:any) {
        if (e.key === 'Enter') {
            this.addTag(this.state.buffer)
            return
        }
    }
    handleSubmit() {
        this.props.onSubmit(this.state.tags)
    }
    addTag(tag:string) {
        this.setState({
            tags: [...this.state.tags, tag]
        })
    }
    removeTag(tag:string) {
        this.setState({
            tags: _.filter(this.state.tags, (o) => (o!==tag))
        })
    }
    render () {
        return <Dialog 
            open={this.props.visible}
            onClose={this.props.onClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">{"修改标签"}</DialogTitle>        
            <DialogContent className={`${styles.dialog}`}>
                <div {...styles.root}>
                    {_.map(this.state.tags, (tag)=> {
                        return <Chip
                            className={`${styles.chip}`}
                            onDelete={()=>{this.removeTag(tag)}} 
                            label={tag}
                            color="default"
                        ></Chip>
                    })}
                </div>
                <TextField autoFocus fullWidth label={'新增Tag'}  onKeyDown={this.handleEnter.bind(this)} value={this.state.buffer} onChange={ this.handleChange.bind(this)}></TextField>
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