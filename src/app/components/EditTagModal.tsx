import * as React from "react"
import { inject, observer } from "mobx-react"
import { css } from 'glamor'
import UIStore from "../stores/uiStore"
import Input from './Input'
import Button from './Button'
import ResourceStore from "../stores/resourceStore"
import Modal from "./Modal"
import * as _ from 'lodash'

const styles = {
    container: css({
        width: '100%',
        height: '100%',
        fontSize: 20,
        borderRadius: 3,
        paddingLeft: 80,
        paddingRight: 80,        
        paddingTop: 70,
        position: 'relative',
        boxSizing: 'border-box'
    }),
    input: css({
        width: 400,
        borderColor: '#1890ff',
        height: 30,
        borderStyle: 'solid',
        borderWidth: 1,
        marginBottom: 20,
        paddingLeft: 10,
        borderRadius:3
    }),
    tag: css({
        height: 36,
        boxSizing: 'border-box',
        borderRadius: 11,
        backgroundColor: '#69c0ff',
        color: '#ffffff',
        paddingLeft: 10,
        paddingRight: 10,
        marginRight: 20,
        whiteSpace: 'no-wrap',
        marginBottom: 10,
        fontSize: 14,
        float: 'left'
    }),
    button: css({
        position: 'absolute',
        left: 180,
        bottom: 75
    })
}

@inject('uiStore', 'resourceStore')
@observer
export default class AddResourceModal extends React.Component {
    state: {}
    constructor(props:any) {
        super(props)
    }
    handleSubmit() {
        let us = (this.props as any).uiStore as UIStore    
        let rs = (this.props as any).resourceStore as ResourceStore
        rs.updateTags(us.editTagModalBuffer.id, us.editTagModalBuffer.tags)
    } 
    handleClose() {
        let us = (this.props as any).uiStore as UIStore
        us.hideEditTagModal()
    }
    render () {
        let us = (this.props as any).uiStore as UIStore
    
        return <Modal visible={us.editTagModalVisible} width={560} height={350} top={180} onClose={()=>{this.handleClose()}}>
            <div {...styles.container}>
                <Input {...styles.input} placeholder={'新增Tag'} onChange={(v)=> {this.setState({from: v})}} onSubmit={(v)=> {us.addTag(v)}}></Input>
                <div style={{lineHeight: '36px'}}>
                    {_.map(us.editTagModalBuffer.tags, (tag)=> {
                        return <span {...styles.tag}>{tag}&nbsp;<a onClick={()=>{us.removeTag(tag)}}>x</a></span>
                    })}
                    <div style={{"clear": "both"}}></div>
                </div>
                <div {...styles.button }>
                    <Button type='primary' onClick={()=>{this.handleSubmit()}}>提交</Button>
                </div>
                
            </div>
        </Modal>
    }
}