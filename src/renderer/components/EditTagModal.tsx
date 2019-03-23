import React, {useState, useMemo} from 'react'
import { makeStyles, createStyles } from '@material-ui/styles'
import { Theme } from '@material-ui/core/styles'
import * as _ from 'lodash'

import {Button, Chip, Dialog, DialogActions, DialogContent, DialogTitle, TextField} from '@material-ui/core'

const useStyles = makeStyles((theme:Theme) => createStyles({
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
}))

interface Props {
    visible: boolean
    tags: string[]
    onSubmit(tags:string[]):void
    onClose():void
}

export default function (props: Props) {
    const classes = useStyles()
    const [tags, setTags] = useState([] as string[])
    const [buffer, setBuffer] = useState("")
    useMemo(() => {
        setTags(props.tags)
    }, [props.tags])
    const handleEnter = (e:any) => {
        if (e.key === 'Enter') {
            addTag(buffer)
            return
        }
    }
    const addTag = (tag:string) => {
        setTags([...tags, tag])
    }
    const removeTag = (tag:string) => {
        setTags( _.filter(tags, (o) => (o!==tag)))
    }

    return (<Dialog 
        open={props.visible}
        onClose={props.onClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
    >
        <DialogTitle id="alert-dialog-title">{"修改标签"}</DialogTitle>        
        <DialogContent className={classes.dialog}>
            <div className={classes.root}>
                {_.map(tags, (tag)=> {
                    return <Chip
                        className={classes.chip}
                        onDelete={()=>{removeTag(tag)}} 
                        label={tag}
                        color="default"
                    ></Chip>
                })}
            </div>
            <TextField autoFocus fullWidth label={'新增Tag'}  onKeyDown={handleEnter} value={buffer} onChange={(e)=> setBuffer(e.target.value)}></TextField>
        </DialogContent>
        <DialogActions>
            <Button onClick={props.onClose}>
               取消
            </Button>
            <Button onClick={() => props.onSubmit(tags)} color="secondary" autoFocus>
                提交
            </Button>
        </DialogActions>
    </Dialog>)
}
