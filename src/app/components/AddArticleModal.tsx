import * as React from "react"
import { inject, observer } from "mobx-react"
import { css } from 'glamor'
import UIStore from "../stores/uiStore"
import Input from './Input'
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

@inject('uiStore', 'resourceStore')
@observer
export default class AddArticleModal extends React.Component {
    state: {
        title: "",
        content: ""
    }
    constructor(props:any) {
        super(props)
    }
    handleSubmit() {
        let rs = (this.props as any).resourceStore as ResourceStore
        rs.addArticle(this.state.title, this.state.content)
        this.handleClose()
    } 
    handleClose() {
        let us = (this.props as any).uiStore as UIStore
        us.hideAddArticleModal()
    }
    render () {
        let us = (this.props as any).uiStore as UIStore
        return (
            <Modal width={700} height={855} top={90} visible={us.addArticleModalVisible}  onClose={()=>{this.handleClose()}}>
                <div {...styles.container}>
                    <div style={{height: 50}}></div>            
                    <Input {...styles.input} placeholder={'title'} onChange={(v)=> {this.setState({title: v})}}></Input>
                    <div style={{height: 20}}></div>
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