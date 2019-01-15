import React, {useState} from "react"
import { makeStyles, createStyles } from '@material-ui/styles'
import { Theme } from '@material-ui/core/styles'

import * as _ from 'lodash'

import {
    Button, 
    Dialog, DialogContent, IconButton,
    Tabs, Tab
} from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add'
import CloseIcon from '@material-ui/icons/Close'
import EditIcon from '@material-ui/icons/Edit'
import SaveIcon from '@material-ui/icons/SaveSharp'
import ViewIcon from '@material-ui/icons/RemoveRedEye'
import SlateEditor from './SlateEditor'

import PageX from './PageX'

const useStyles =  makeStyles((theme:Theme) => createStyles({
    dialog: {
        flexDirection: 'column',
        justifyContent: "flex-start"
    },
    paper: {
        width: 1008,
        marginTop: 24,
        maxHeight: 'none'
    },
    content: {
        fontSize: 20,
        position:'relative',
        "&:first-child": {
            padding: 0
        }
    },
    widget: {
        width: 960,
        height: '85vh',
        marginTop: 16,
        boxSizing: 'border-box',
        margin: 'auto',
        "& .ace_scrollbar": { 
            display: 'none'
        }
    },
    addBtn: {
        position: 'absolute',
        bottom: 4*theme.spacing.unit,
        right: 4*theme.spacing.unit
    },
    saveBtn: {
        position: 'absolute',
        bottom: 14*theme.spacing.unit,
        right: 4*theme.spacing.unit
    },
    viewBtn: {
        position: 'absolute',
        bottom: 24*theme.spacing.unit,
        right: 4*theme.spacing.unit
    },
    editBtn: {
        position: 'absolute',
        bottom: 24*theme.spacing.unit,
        right: 4*theme.spacing.unit
    },
    tab: {
        display: 'inline-flex',
        alignItems: 'flex-end',
        justifyContent: 'space-between',
        '& .closeBtn': {
            padding: 0,
            marginLeft: 8,
            visibility: "hidden"
        },
        '&:hover': {
            '& .closeBtn': {
                visibility: 'visible'
            }
        }
    }
}))

interface Props {
    visible: boolean
    curTab: number,
    tabs: string[],
    curDirty: boolean,
    curContent: string,
    onSwitch(n:number):void
    keybindings?: string
    onSave():void
    onCloseTab(n:number):void
    onChange(content:string):void
    onAdd():void
    onClose():void
}


export default function (props:Props) {
    const classes = useStyles()

    const [preview, setPreview] = useState(false)
    const handleToggle = () => {
        setPreview(!preview)
    }
    
    let widget: React.ReactElement<any>[]
    if (!preview) {
        widget = [
            <SlateEditor value={props.curContent} onSave={props.onSave}></SlateEditor>,
            <Button 
                className={classes.viewBtn} 
                color="secondary" 
                variant="fab"
                onClick={handleToggle}
            ><ViewIcon/></Button>
        ]
    } else {
        widget = [
            <PageX width={960} height={'85vh'} content={props.curContent}></PageX>,
            <Button 
                className={classes.editBtn} 
                color="secondary" 
                variant="fab"
                onClick={handleToggle}
            ><EditIcon/></Button>
        ]
    }
    return (
        <Dialog
            open={props.visible}
            onClose={props.onClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            maxWidth="lg"
            classes={
                {root: classes.dialog, paper: classes.paper}
            }
        >
            <DialogContent classes={{root: classes.content}}>
                <Tabs
                    value={props.curTab}
                    onChange={(e, v)=> {props.onSwitch(v)}}
                    indicatorColor="primary"
                    textColor="primary"
                >
                    {
                        _.map(props.tabs, (tab, k)=> {
                            return <Tab component="div" label={
                                <span className={classes.tab}>
                                    <span>{tab}</span>
                                    <IconButton className="closeBtn" onClick={(e)=>{props.onCloseTab(k); e.stopPropagation()}}>
                                        <CloseIcon  fontSize="small"/>
                                    </IconButton>
                                </span>
                            }/>
                        })
                    }
                </Tabs>
                <div className={classes.widget}>
                    {widget}
                    <Button 
                        className={classes.saveBtn} 
                        color="primary" 
                        variant="fab"
                        onClick={props.onSave}
                    ><SaveIcon/></Button>                    
                </div>
                <Button 
                        className={classes.addBtn} 
                        color="secondary" 
                        variant="fab"
                        onClick={props.onAdd}
                    ><AddIcon/></Button>                    
            </DialogContent>
        </Dialog>
    )
}
