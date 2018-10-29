import * as React from 'react'

import { withStyles, WithStyles, createStyles, Theme } from '@material-ui/core/styles'
import {Snackbar, SnackbarContent} from '@material-ui/core'
import CheckCircleIcon from '@material-ui/icons/CheckCircle'
import ErrorIcon from '@material-ui/icons/Error'
import InfoIcon from '@material-ui/icons/Info'
import WarningIcon from '@material-ui/icons/Warning'
import green from '@material-ui/core/colors/green'
import amber from '@material-ui/core/colors/amber'

const variantIcon = {
    success: CheckCircleIcon,
    warning: WarningIcon,
    error: ErrorIcon,
    info: InfoIcon,
}
  
const styles = (theme:Theme) => createStyles({
    success: {
        backgroundColor: green[600] + ' !important',
    },
    error: {
        backgroundColor: theme.palette.error.dark + ' !important',
    },
    info: {
        backgroundColor: theme.palette.secondary.dark + '!important',
    },
    warning: {
        backgroundColor: amber[700] + '!important',
    },
    icon: {
        fontSize: 20,
    },
    iconVariant: {
        opacity: 0.9,
        marginRight: theme.spacing.unit,
    },
    message: {
        display: 'flex',
        alignItems: 'center',
    }
})

interface Props extends WithStyles<typeof styles> {
    id: number
    msg: string
    kind: string
}

export default withStyles(styles)(class NotificationManager extends React.Component<Props> {
    state:any = {
        show: false,
        msg: "",
        kind: "info"
    }
    queue:any[] = []

    componentWillReceiveProps(props:any) {
        this.queue.push({
            msg: props.msg,
            kind: props.kind,
            key: props.id
        })
        if (this.state.open) {
            this.setState({ show: false })
          } else {
            this.processQueue()
          }        
    }

    processQueue () {
        if (this.queue.length > 0) {
            let obj = this.queue.shift()
          this.setState({
            msg: obj.msg,
            kind: obj.kind,
            key: obj.key,
            show: true,
          })
        }
    }

    handleClose = (event:any, reason:string) => {
        if (reason === 'clickaway') {
          return
        }
        this.setState({ show: false })
    }
    
    handleExited () {
        this.processQueue()
    }    

    render () {
        let classes = this.props.classes
        let variantStyle =  (classes as {[key:string]:string})[this.state.kind]
        
        let iconStyle = [classes.icon, classes.iconVariant].join(" ")
        let Icon = (variantIcon as any)[this.state.kind]
        return (<Snackbar
            anchorOrigin={{ vertical: "top", horizontal: "right" }}
            open={this.state.show}
            autoHideDuration={1500}
            onClose={this.handleClose.bind(this)}
            onExited={this.handleExited.bind(this)}
        >
            <SnackbarContent
                classes={{
                    root: variantStyle
                }}
                message={
                <span id="client-snackbar" className={classes.message}>
                    <Icon className={iconStyle} />
                    {this.state.msg}
                </span>
                }
            ></SnackbarContent>

        </Snackbar>)
    }
})