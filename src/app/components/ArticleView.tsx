import * as React from "react"
import { css } from 'glamor'
import Modal from './Modal'
import PageX from './PageX'


const styles = {
    container: css({
        fontSize: 14,
        boxSizing: 'border-box',
        paddingTop: 36,
        paddingLeft: 50,
        paddingRight: 50,
    })
}

interface Props {
    content: string
    visible: boolean
    onClose():void
}

export default function(props:Props) {
    return (
        <Modal width={960} height={855} top={90} visible={props.visible}  onClose={props.onClose}>
            <div {...styles.container}>
              <PageX content={props.content}></PageX>
            </div>                
        </Modal>
    )
}
