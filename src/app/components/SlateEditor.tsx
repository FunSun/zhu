import React, {useState} from 'react'

import Plain from 'slate-plain-serializer'
import {Editor} from 'slate-react'

const initValue = Plain.deserialize("尝试使用slate编辑器")

interface Props {
}

export default function (props: Props) {
    const [value, setValue] = useState(initValue)
    return <Editor placeholder="请输入?" value={value} onKeyDown={(e, editor, next) => {next()}} onChange={({value})=>{setValue(value)}}></Editor>    
}
