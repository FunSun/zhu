import React from 'react'
const katex = require('katex')

interface Props {
    children: string
}

export default function (props:Props) {
    const html = katex.renderToString(props.children, {
        displayMode: true,
        throwOnError: false, // fail silently
        errorColor: '#ff0000',
        delimiters: ([
          { left: "$$", right: "$$", display: true },
          { left: "\\[", right: "\\]", display: true },
          { left: "\\(", right: "\\)", display: false },
          { left: '~', right: '~', display: false, asciimath: true },
        ])
    })
    return (<div dangerouslySetInnerHTML={{__html: html}}></div>)
}