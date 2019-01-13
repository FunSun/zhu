import React, { useState, useMemo } from 'react'
import { makeStyles, createStyles } from '@material-ui/styles'
import { Theme } from '@material-ui/core/styles'

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
  
const useStyles = makeStyles((theme:Theme) => createStyles({
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
}))

interface Props {
    id: number
    msg: string
    kind: string
}

let queue:any[] = []

export default function (props:Props) {
    const classes = useStyles()
    const [show, setShow] = useState(false)
    const [msg, setMsg] = useState("")
    const [kind, setKind] = useState("info")
    const [key, setKey] = useState(0)
    const processQueue = () => {
        if (queue.length > 0) {
            let obj = queue.shift()
            setMsg(obj.msg)
            setKind(obj.kind)
            setKey(obj.key)
            setShow(true)
        }
    }
    useMemo(()=> {
        queue.push({
            msg: props.msg,
            kind: props.kind,
            key: props.id
        })
        if (show) {
            setShow(false)
            return
        }
        processQueue()            
    }, [props.id])
    const handleClose = (event:any, reason:string) => {
        if (reason === 'clickaway') {
            return
        }
        setShow(false)
    }

    if (!kind) {
        return <div></div>
    }
    const handleExited = processQueue

    let variantStyle = (classes as {[key:string]:string})[kind]
    let iconStyle = [classes.icon, classes.iconVariant].join(" ")
    let Icon = (variantIcon as any)[kind]
    return (<Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={show}
        autoHideDuration={1500}
        onClose={handleClose}
        onExited={handleExited}
    >
        <SnackbarContent
            classes={{
                root: variantStyle
            }}
            message={
            <span id="client-snackbar" className={classes.message}>
                <Icon className={iconStyle} />
                {msg}
            </span>
            }
        ></SnackbarContent>

    </Snackbar>)
}
