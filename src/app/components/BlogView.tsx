import * as React from "react"
import { css } from 'glamor'
import Modal from './Modal'

const styles = {
    container: css({
        fontSize: 14,
        boxSizing: 'border-box',
        paddingTop: 36,
        paddingLeft: 24,
        paddingRight: 24,
    }),
    widget: css({
        width: 960,
        height: 840,
        boxSizing: 'border-box',
        margin: 'auto',
        overflowY: 'scroll',
        '::-webkit-scrollbar': {
            display: 'none'
        }
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
                    <div dangerouslySetInnerHTML={{__html: props.content}}></div>
                </div>
            </div>
        </Modal>
    )
}
