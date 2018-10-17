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
    }),
    widget: css({
        width: 960,
        height: 840,
        boxSizing: 'border-box',
        margin: 'auto'
    })
}

interface Props {
    content: string
    visible: boolean
    onClose():void
}

export default function(props:Props) {
    return (
        <Modal width={1008} height={960} top={24} visible={props.visible}  onClose={props.onClose}>
            <div {...styles.container}>
                <div {...styles.widget}>
                    <PageX height={880} content={props.content}></PageX>
                </div>
            </div>
        </Modal>
    )
}
