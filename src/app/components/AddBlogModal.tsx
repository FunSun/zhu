import * as React from "react"
import { inject, observer } from "mobx-react"
import { css } from 'glamor'
import UIStore from "../stores/uiStore"
import Input from './Input'
import ResourceStore from "../stores/resourceStore"

const styles = {
    layer: css({
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: 1,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(214, 228, 255, 0.7)'
    }),
    container: css({
        width: 700,
        height: 855,
        fontSize: 20,
        backgroundColor: '#ffffff',
        margin: 'auto',
        marginTop: 90,
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
        width: 600,
        borderColor: '#1890ff',
        height: 510,
        borderStyle: 'solid',
        paddingLeft: 10,
        paddingRight: 10
    }),
    buttonArea: css({
        display: 'flex',
        justifyContent: 'center'
    }),
    button: css({
        width: 200,
        height: 50,
        borderWidth: 0,
        backgroundColor: '#1890FF',
        color: '#ffffff',
        fontSize: 20,
        display: 'flex',
        cursor: 'pointer'
    }),
    button1: css({
        width: 200,
        height: 50,
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: '#1890FF',
        backgroundColor: '#ffffff',
        color: '#1890FF',
        fontSize: 20,
        display: 'flex',
        cursor: 'pointer'
    }),
    buttonText: css({
        margin: 'auto',
        marginTop: 9
    })
}

@inject('uiStore', 'resourceStore')
@observer
export default class AddResourceModal extends React.Component {
    state: {
        from: "",
        title: "",
        tags: "",
        content: ""
    }
    constructor(props:any) {
        super(props)
    }
    handleSubmit() {
        let rs = (this.props as any).resourceStore as ResourceStore
        rs.addBlog({
            from: this.state.from,
            title: this.state.title,
            tags: this.state.tags.split(','),
            content: this.state.content
        })
    } 
    handleClose() {
        let us = (this.props as any).uiStore as UIStore
        us.hideAddBlogModal()
    }
    render () {
        let us = (this.props as any).uiStore as UIStore
        if (!us.addBlogModalVisible) {
            return (<div></div>)
        }
        return (<div {...styles.layer}>
            <div {...styles.container}>
                <div style={{height: 50}}></div>            
                <Input {...styles.input} placeholder={'from'} onChange={(v)=> {this.setState({from: v})}}></Input>
                <div style={{height: 20}}></div>
                <Input {...styles.input} placeholder={'title'} onChange={(v)=> {this.setState({title: v})}}></Input>
                <div style={{height: 20}}></div>
                <Input {...styles.input} placeholder={'tags'} onChange={(v)=> {this.setState({tags: v})}}></Input>
                <div style={{height: 20}}></div>
                <textarea {...styles.textarea} onChange={(e)=>{this.setState({content:e.target.value})}}></textarea>

                <div style={{height: 30}}></div>
                <div {...styles.buttonArea}>
                    <div {...styles.button} onClick={()=> {this.handleSubmit()}}><span {...styles.buttonText}>完成</span></div>
                    <div style={{width: 40}}></div>                    
                    <div {...styles.button1} onClick={()=> {this.handleClose()}}><span {...styles.buttonText}>放弃</span></div>
                </div>

            </div>
        </div>)
    }
}