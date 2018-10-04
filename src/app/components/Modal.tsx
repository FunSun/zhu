import * as React from "react"
import { css } from 'glamor'

const baseLayerStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 1,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(214, 228, 255, 0.7)'
}

const baseContainerStyle = {
    position: 'relative',
    backgroundColor: '#ffffff',
    margin: 'auto',
}

const closeButtonStyle = css({
    width: 30,
    height: 30,
    fontSize: 30,
    position: 'absolute',
    right: 20,
    top: 10,
    color: '#8c8c8c'
})

type ModalProps = {
    onClose?: () => void,
    visible: boolean,
    top: number,
    width: number,
    height?:number
    children: React.ReactNode
}

export default function Modal (props:ModalProps) {
    const layerStyle = css({...baseLayerStyle, "display": props.visible?"block":"none"})
    const containerStyle = css({...baseContainerStyle, "marginTop": props.top, "width":props.width, "height": props.height?props.height:'auto'})

    return (<div {...layerStyle}>
        <div {...closeButtonStyle} onClick={() => {if(props.onClose) {props.onClose()}}}>X</div>
        <div {...containerStyle}>{props.children}</div>
    </div>)
}
