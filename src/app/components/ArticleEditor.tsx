import * as React from "react"

import { css } from 'glamor'
import Button from './Button'
import Modal from './Modal'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import PageX from './PageX'

import 'brace'
import AceEditor from 'react-ace'
import 'brace/mode/markdown'
import 'brace/theme/chrome'
import 'brace/keybinding/emacs'
import 'brace/ext/language_tools'

import * as _ from 'lodash'

import * as fs from 'fs'

const completer:any = {
    getCompletions: (editor:any, session:any, pos:any, prefix:string, cb:any) => {
        if (!_.startsWith(prefix, 'images')) {
            cb(null, [])
            return
        }
        fs.readdir("./build/images", (err, files)=> {
            let completions = _.map(files, (file) => {
                return {
                    caption: file,
                    value: 'images/' + file,
                    meta: 'images'
                }
            })
            cb(null, completions)
        })
    }
}

const completeShortcut = {
    name: "autocomplete-alias",
    exec: (editor:any) => { editor.execCommand("startAutocomplete")},
    bindKey: "Ctrl-Q"
}

const styles = {
    container: css({
        fontSize: 20,
    }),
    widget: css({
        width: 912,
        height: 720,
        boxSizing: 'border-box',
        margin: 'auto'
    }),
    buttonArea: css({
        display: 'flex',
        justifyContent: 'center'
    }),
}

interface ArticleEditorProps {
    visible: boolean
    rid: string,
    content: string,
    onAddArticle(content:string):void
    onUpdateArticle(id:string, content:string):void
    onClose():void
}

export default class ArticleEditor extends React.Component<ArticleEditorProps> {
    state = {
        rid: "",
        content: "",
        value: 0
    }

    constructor(props:any) {
        super(props)
        this.state = {
            rid: props.rid,
            content: props.content,
            value: 0
        }
    }

    componentWillReceiveProps(props:any) {
        this.setState({
            rid: props.rid,
            content: props.content
        })
    }

    handleSubmit() {
        let id = this.state.rid
        let content = this.state.content
        if (id !== "") {
            this.props.onUpdateArticle(id, content)
        } else {
            this.props.onAddArticle(content)
        }
        
        this.props.onClose()
    } 
    
    handleSwitch = (event:any, value:number) => {
        this.setState({ value })
    }
    
    render () {
        let widget: React.ReactElement<any>
            if (this.state.value == 0) {
                widget = (<AceEditor 
                    mode="markdown" 
                    theme="chrome" 
                    onChange={(v)=>{this.setState({content:v})}} 
                    editorProps={{$blockScrolling: true}} 
                    value={this.state.content}
                    fontSize={14}
                    width={"900px"}
                    height={"720px"}
                    showPrintMargin={false}
                    wrapEnabled={true}
                    keyboardHandler="emacs"
                    commands={[completeShortcut as any]}
                    setOptions={{
                        enableBasicAutocompletion: ([completer]) as any,
                        enableLiveAutocompletion: false,
                    }}
                >
                </AceEditor>)
            } else {
                widget = (<PageX content={this.props.content}></PageX>)
            }
        return (
            <Modal width={960} height={855} top={90} visible={this.props.visible}  onClose={this.props.onClose}>
                <div {...styles.container}>
                    <Tabs
                        value={this.state.value}
                        onChange={this.handleSwitch.bind(this)}
                        indicatorColor="primary"
                        textColor="primary"
                        centered
                    >
                        <Tab label="编辑" />
                        <Tab label="预览" />
                    </Tabs>
                    <div {...styles.widget}>
                        {widget}
                    </div>
                    
                    <div style={{height: 30}}></div>
                    <div {...styles.buttonArea}>
                        <Button type="primary" onClick={()=>{this.handleSubmit()}}>完成</Button>
                        <div style={{width: 40}}></div>                                        
                        <Button onClick={this.props.onClose}>放弃</Button>
                    </div>

                </div>                
            </Modal>
        )
    }
}
