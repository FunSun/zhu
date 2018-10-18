import * as React from 'react'
import CheckCircleIcon from '@material-ui/icons/CheckCircle'
import ErrorIcon from '@material-ui/icons/Error'
import InfoIcon from '@material-ui/icons/Info'
import WarningIcon from '@material-ui/icons/Warning'
import Snackbar from '@material-ui/core/Snackbar'
import SnackbarContent from '@material-ui/core/SnackbarContent'
import { createMuiTheme } from '@material-ui/core/styles'
import green from '@material-ui/core/colors/green'
import amber from '@material-ui/core/colors/amber'
import {css} from 'glamor'

const theme = createMuiTheme({
    typography: {
      useNextVariants: true
    }
})

const variantIcon = {
    success: CheckCircleIcon,
    warning: WarningIcon,
    error: ErrorIcon,
    info: InfoIcon,
  }
  
const styles = {
    success: css({
        backgroundColor: green[600] + ' !important',
    }),
    error: css({
        backgroundColor: theme.palette.error.dark + ' !important',
    }),
    info: css({
        backgroundColor: theme.palette.secondary.dark + '!important',
    }),
    warning: css({
        backgroundColor: amber[700] + '!important',
    }),
    icon: css({
        fontSize: 20,
    }),
    iconVariant: css({
        opacity: 0.9,
        marginRight: theme.spacing.unit,
    }),
    message: css({
        display: 'flex',
        alignItems: 'center',
    })
}

interface Props {
    id: number
    msg: string
    kind: string
}

export default class NotificationManager extends React.Component<Props> {
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
        let variantStyle = (styles as any)[this.state.kind]
        
        let iconStyle = css(styles.icon, styles.iconVariant)
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
                    root: `${variantStyle}`
                }}
                message={
                <span id="client-snackbar" className={`${styles.message}`}>
                    <Icon className={`${iconStyle}`} />
                    {this.state.msg}
                </span>
                }
            ></SnackbarContent>

        </Snackbar>)
    }
}