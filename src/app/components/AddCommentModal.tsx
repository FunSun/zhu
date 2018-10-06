import * as React from "react"
import { inject, observer } from "mobx-react"
import { css } from 'glamor'
import UIStore from "../stores/uiStore"
import Button from './Button'
import Modal from './Modal'
import ResourceStore from "../stores/resourceStore"

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

@inject('uiStore', 'resourceStore')
@observer
export default class AddResourceModal extends React.Component {
    state: {
        content: ""
    }
    constructor(props:any) {
        super(props)
    }
    handleSubmit() {
        let rs = (this.props as any).resourceStore as ResourceStore
        rs.addComment(this.state.content)
        let us = (this.props as any).uiStore as UIStore
        us.hideAddCommentModal()
    } 
    handleClose() {
        let us = (this.props as any).uiStore as UIStore
        us.hideAddCommentModal()
    }
    render () {
        let us = (this.props as any).uiStore as UIStore
        return (
            <Modal width={700} height={755} top={140} visible={us.addCommentModalVisible}  onClose={()=>{this.handleClose()}}>
                <div {...styles.container}>
                    <div style={{height: 50}}></div>            
                    <textarea {...styles.textarea} onChange={(e)=>{this.setState({content:e.target.value})}}></textarea>
                    <div style={{height: 30}}></div>
                    <div {...styles.buttonArea}>
                        <Button type="primary" onClick={()=> {this.handleSubmit()}}>完成</Button>
                        <div style={{width: 40}}></div>                                        
                        <Button onClick={()=> {this.handleClose()}}>放弃</Button>
                    </div>

                </div>                
            </Modal>
        )
    }
}