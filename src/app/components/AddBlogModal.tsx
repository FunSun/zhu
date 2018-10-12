import * as React from "react"
import { css } from 'glamor'
import Input from './Input'
import Button from './Button'
import Modal from './Modal'

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
}

interface Props {
    visible: boolean
    onSubmit(resource:any):void
    onClose():void
}

export default class AddBlogModal extends React.Component<Props> {
    state: {
        from: "",
        title: "",
        tags: "",
        content: ""
    }
    handleSubmit() {
        this.props.onSubmit({
            from: this.state.from,
            title: this.state.title,
            tags: this.state.tags.split(','),
            content: this.state.content
        })
        this.props.onClose()
    } 
    render () {
        return (
            <Modal width={700} height={855} top={90} visible={this.props.visible}  onClose={()=>{this.props.onClose}}>
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
                        <Button type="primary" onClick={()=> {this.handleSubmit()}}>完成</Button>
                        <div style={{width: 40}}></div>                                        
                        <Button onClick={()=> {this.props.onClose()}}>放弃</Button>
                    </div>

                </div>                
            </Modal>
        )
    }
}