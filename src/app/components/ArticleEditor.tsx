import * as React from "react"
import * as _ from 'lodash'

import { withStyles, WithStyles, createStyles, Theme } from '@material-ui/core/styles'
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

import 'brace'
import AceEditor from 'react-ace'
import 'brace/mode/markdown'
import 'brace/theme/chrome'
import 'brace/keybinding/emacs'
import 'brace/keybinding/vim'
import 'brace/ext/language_tools'

import PageX from './PageX'

const styles = (theme:Theme) => createStyles({
    dialog: {
        flexDirection: 'column',
        justifyContent: "flex-start"
    },
    paper: {
        width: 1008,
        marginTop: 24
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
        height: 840,
        marginTop: 16,
        boxSizing: 'border-box',
        margin: 'auto'
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
})

interface Props extends WithStyles<typeof styles>{
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

export default withStyles(styles)(class ArticleEditor extends React.Component<Props> {
    state = {
        preview: false
    }
    
    shortcuts: any[] = [{
        name: "autocomplete-alias",
        exec: (editor:any) => { editor.execCommand("startAutocomplete")},
        bindKey: "Ctrl-Q"
    }]

    handleCopy(v:string) {
        (global as any).clipboard.writeText(v)
    }

    handleToggle = () => {
        this.setState({preview: !this.state.preview})
    }

    render () {
        let classes = this.props.classes
        let widget: React.ReactElement<any>[]
            if (!this.state.preview) {
                widget = [
                    <AceEditor 
                        showGutter={false}
                        mode="markdown" 
                        theme="chrome" 
                        onChange={this.props.onChange} 
                        editorProps={{$blockScrolling: true}} 
                        value={this.props.curContent}
                        fontSize={14}
                        width={"960px"}
                        height={"800px"}
                        showPrintMargin={false}
                        wrapEnabled={true}
                        keyboardHandler={(this.props.keybindings!=="default")?this.props.keybindings:undefined}
                        commands={(this.shortcuts as any)}
                        onCopy={this.handleCopy}
                        setOptions={{
                            enableBasicAutocompletion: true,
                            enableLiveAutocompletion: false,
                        }}
                    >
                    </AceEditor>,
                    <Button 
                        className={classes.viewBtn} 
                        color="secondary" 
                        variant="fab"
                        onClick={()=> {this.handleToggle()}}
                    ><ViewIcon/></Button>
                ]
            } else {
                widget = [
                    <PageX height={840} content={this.props.curContent}></PageX>,
                    <Button 
                        className={classes.editBtn} 
                        color="secondary" 
                        variant="fab"
                        onClick={()=> {this.handleToggle()}}
                    ><EditIcon/></Button>
                ]
            }
        return (
            <Dialog
                open={this.props.visible}
                onClose={this.props.onClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                maxWidth="lg"
                classes={
                    {root: classes.dialog, paper: classes.paper}
                }
            >
                <DialogContent classes={{root: classes.content}}>
                    <Tabs
                        value={this.props.curTab}
                        onChange={(e, v)=> {this.props.onSwitch(v)}}
                        indicatorColor="primary"
                        textColor="primary"
                    >
                        {
                            _.map(this.props.tabs, (tab, k)=> {
                                return <Tab component="div" label={
                                    <span className={classes.tab}>
                                        <span>{tab}</span>
                                        <IconButton className="closeBtn" onClick={(e)=>{this.props.onCloseTab(k); e.stopPropagation()}}>
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
                            onClick={this.props.onSave}
                        ><SaveIcon/></Button>                    
                    </div>
                    <Button 
                            className={classes.addBtn} 
                            color="secondary" 
                            variant="fab"
                            onClick={this.props.onAdd}
                        ><AddIcon/></Button>                    
                </DialogContent>
            </Dialog>
        )
    }
})
