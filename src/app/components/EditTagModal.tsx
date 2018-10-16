import * as React from "react"
import { css } from 'glamor'
import Input from './Input'
import Button from './Button'
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

interface Props {
    visible: boolean
    tags: string[]
    onSubmit(tags:string[]):void
    onClose():void
}

export default class AddResourceModal extends React.Component<Props> {
    state: {tags:string[]}
    constructor(props:Props) {
        super(props)
        this.state = {
            tags: props.tags
        }
    }
    componentWillReceiveProps(props:Props) {
        this.setState({
            tags: props.tags
        })
    }
    handleSubmit() {
        this.props.onSubmit(this.state.tags)
    } 
    addTag(tag:string) {
        this.setState({
            tags: [...this.state.tags, tag]
        })
    }
    removeTag(tag:string) {
        this.setState({
            tags: _.remove(this.state.tags, tag)
        })
    }
    render () {
        console.log(this.state.tags)
        return <Modal visible={this.props.visible} width={560} height={350} top={180} onClose={this.props.onClose}>
            <div {...styles.container}>
                <Input {...styles.input} placeholder={'新增Tag'} onSubmit={this.addTag.bind(this)}></Input>
                <div style={{lineHeight: '36px'}}>
                    {_.map(this.state.tags, (tag)=> {
                        return <span {...styles.tag}>{tag}&nbsp;<a onClick={()=>{this.removeTag(tag)}}>x</a></span>
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