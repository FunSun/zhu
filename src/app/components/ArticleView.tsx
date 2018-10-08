import * as React from "react"
import { inject, observer } from "mobx-react"
import { css } from 'glamor'
import UIStore from "../stores/uiStore"
import Modal from './Modal'
import {parse} from '../pagex'

const styles = {
    container: css({
        fontSize: 14,
        boxSizing: 'border-box',
        paddingTop: 36,
        paddingLeft: 50,
        paddingRight: 50,        
        '& > h1': {
            textAlign: 'center',
            marginTop: 0,
            marginBottom: 10,
        },
        '& > article': {
        }
    })
}

@inject('uiStore')
@observer
export default class AddResourceModal extends React.Component {
    constructor(props:any) {
        super(props)
    }
    handleClose() {
        let us = (this.props as any).uiStore as UIStore
        us.hideArticleView()
    }
    render () {
        let us = (this.props as any).uiStore as UIStore
        let title = us.articleViewBuffer.title
        let content = us.articleViewBuffer.content
        console.log(content)
        let target: React.ReactNode
        eval(parse(content))
        return (
            <Modal width={700} height={855} top={90} visible={us.articleViewVisible}  onClose={()=>{this.handleClose()}}>
                <div {...styles.container}>
                    <h1>{title}</h1>
                    {target}
                </div>                
            </Modal>
        )
    }
}