import * as React from "react"
import { css, StyleAttribute } from 'glamor'


const basicButtonStyle = {
    width: 200,
    height: 50,
    cursor: 'pointer',
    borderStyle: 'solid',
    '& span': {
        display: 'inline-block',
        fontSize: 20,
        width: 200,
        textAlign: 'center',
        marginTop: 9
    }
}

const primaryButtonStyle = css({
    ...basicButtonStyle,
    borderWidth: 0,
    backgroundColor: '#1890FF',
    color: '#ffffff'
})

const defaultButtonStyle = css({
    ...basicButtonStyle,
    borderWidth: 1,
    borderColor: '#1890FF',
    backgroundColor: '#ffffff',
    color: '#1890FF',
})

type ButtonProps = {
    type?: string
    children: React.ReactNode
    onClick: (e:React.MouseEvent) => void
}

export default function Button (props:ButtonProps) {
    let buttonStyle:StyleAttribute
    if (props.type === 'primary') {
        buttonStyle = primaryButtonStyle
    } else {
        buttonStyle = defaultButtonStyle
    }
    return <div {...buttonStyle} onClick={props.onClick}>
        <span>{props.children}</span>
    </div>
}