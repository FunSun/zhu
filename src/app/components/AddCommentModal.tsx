import * as React from "react"
import { css } from 'glamor'
import Button from './Button'
import Modal from './Modal'

const styles = {
    container: css({
        fontSize: 20,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
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
    onSubmit(content:string):void
    onClose():void
}

export default class AddResourceModal extends React.Component<Props> {
    state: {
        content: ""
    }
    handleSubmit() {
        this.props.onSubmit(this.state.content)
        this.props.onClose()
    } 
    render () {
        return (
            <Modal width={700} height={755} top={140} visible={this.props.visible}  onClose={this.props.onClose}>
                <div {...styles.container}>
                    <div style={{height: 50}}></div>            
                    <textarea {...styles.textarea} onChange={(e)=>{this.setState({content:e.target.value})}}></textarea>
                    <div style={{height: 30}}></div>
                    <div {...styles.buttonArea}>
                        <Button type="primary" onClick={()=> {this.handleSubmit()}}>完成</Button>
                        <div style={{width: 40}}></div>                                        
                        <Button onClick={this.props.onClose}>放弃</Button>
                    </div>

                </div>                
            </Modal>
        )
    }
}