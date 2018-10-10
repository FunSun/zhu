import * as React from "react"
import { inject, observer } from "mobx-react"
import { css } from 'glamor'
import UIStore from "../stores/uiStore"
import Button from './Button'
import Modal from './Modal'
import ResourceStore from "../stores/resourceStore"
import 'brace'
import AceEditor from 'react-ace'
import 'brace/mode/markdown'
import 'brace/theme/chrome'
import 'brace/keybinding/emacs'


const styles = {
    container: css({
        fontSize: 20,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    }),
    input: css({
        width: 600,
        borderColor: '#1890ff',
        height: 35,
        borderStyle: 'solid',
        borderWidth: 1,
        paddingLeft: 10,
        paddingRight: 10
    }),
    textarea: css({
        width: 900,
        borderColor: '#1890ff',
        height: 720,
        borderStyle: 'solid',
        paddingLeft: 10,
        paddingRight: 10
    }),
    buttonArea: css({
        display: 'flex',
        justifyContent: 'center'
    }),
}

class ArticleEditor extends React.Component<any> {
    state = {
        id: "",
        content: ""
    }

    constructor(props:any) {
        super(props)
        this.state = {
            id: props.rid,
            content: props.content
        }
    }

    componentWillReceiveProps(props:any) {
        console.log(props)
        this.setState({
            id: props.rid,
            content: props.content
        })
    }
    render () {
        console.log(this.state)
        return (
            <Modal width={960} height={855} top={90} visible={this.props.visible}  onClose={this.props.onClose}>
                <div {...styles.container}>
                    <div style={{height: 50}}></div>            
                    <AceEditor 
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
                    >
                    </AceEditor>
                    <div style={{height: 30}}></div>
                    <div {...styles.buttonArea}>
                        <Button type="primary" onClick={()=>{this.props.onSubmit(this.state.id, this.state.content)}}>完成</Button>
                        <div style={{width: 40}}></div>                                        
                        <Button onClick={this.props.onClose}>放弃</Button>
                    </div>

                </div>                
            </Modal>
        )
    }
}

@inject('uiStore', 'resourceStore')
@observer
export default class ArticleEditorObserver extends React.Component {

    handleSubmit(id?:string, content?:string) {
        let rs = (this.props as any).resourceStore as ResourceStore
        if (id) {
            rs.updateArticle(id, content)
        } else {
            rs.addArticle(content)
        }
        
        
        this.handleClose()
    } 
    handleClose() {
        let us = (this.props as any).uiStore as UIStore
        us.hideArticleEditor()
    }

    render () {
        let us = (this.props as any).uiStore as UIStore    
        return (<ArticleEditor 
            onSubmit={(id:any, v:any)=>{this.handleSubmit(id, v)}}
            onClose={()=>{this.handleClose()}}
            visible={us.articleEditorVisible}
            content={us.articleEditorBuffer.content}
            rid={us.articleEditorBuffer.id}>
        </ArticleEditor>)
    }
}