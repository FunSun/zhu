import * as React from "react"
import * as _ from 'lodash'

import { withStyles, WithStyles, createStyles, Theme } from '@material-ui/core/styles'
import {Button, Chip, Dialog, DialogActions, DialogContent, DialogTitle, TextField} from '@material-ui/core'

const styles = (theme:Theme) => createStyles({
    dialog: {
        width: 480
    },
    root: {
        display: 'flex',
        justifyContent: 'flex-start',
        flexWrap: 'wrap',
        marginBottom: 2*theme.spacing.unit
    },
    chip: {
        margin: theme.spacing.unit,
    }
})

interface Props extends WithStyles<typeof styles>{
    visible: boolean
    tags: string[]
    onSubmit(tags:string[]):void
    onClose():void
}

export default withStyles(styles)(class AddResourceModal extends React.Component<Props> {
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
        let classes = this.props.classes
        return <Dialog 
            open={this.props.visible}
            onClose={this.props.onClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">{"修改标签"}</DialogTitle>        
            <DialogContent className={classes.dialog}>
                <div className={classes.root}>
                    {_.map(this.state.tags, (tag)=> {
                        return <Chip
                            className={classes.chip}
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
})