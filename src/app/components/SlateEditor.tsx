import React, { useState, useMemo, useRef} from 'react'

import Plain from 'slate-plain-serializer'
import {Editor} from 'slate-react' 
import * as slate from 'slate'

interface Props {
    value: string
    onSave(content: string):void
}

export default function (props: Props) {
    let [val, setVal] = useState(Plain.deserialize(""))
    useMemo(() => {
        setVal(Plain.deserialize(props.value))
    }, [props.value])
    let keyboardHandler = useKeyHandler(props)
    return <Editor style={{fontSize: 14}} placeholder="请输入?" value={val} onKeyDown={keyboardHandler} onChange={({value})=>{setVal(value)}}></Editor>    
}

function useKeyHandler(props:Props):any {
    let ref = useRef(pointMove)
    return (e: KeyboardEvent, editor:Editor, next:()=> any) => {
        if (e.ctrlKey) {
            e.preventDefault()
            switch (e.key) {
                case "a":
                return editor.moveToStartOfBlock()
                case "e":
                return editor.moveToEndOfBlock()
                case "f":
                return ref.current.moveForward(editor)
                case "b":
                return ref.current.moveBackward(editor)
                case "p":
                return ref.current.moveUpward(editor)
                case "n":
                return ref.current.moveDownward(editor)
                case "w":
                return doCopy(editor)
                case "y":
                return doPaste(editor)
                case "s":
                return props.onSave(Plain.serialize(editor.value))
                case " ":
                return toggleRef(ref, editor)
            }
        }
        next()
    }
}


let pointMove = {
    moveUpward: (editor:Editor) => {
        let originOffset = editor.value.selection.focus.offset
        editor.moveToStartOfPreviousBlock()
        let rowLen = editor.value.focusText.text.length
        if (originOffset > rowLen) {
            originOffset = rowLen
        }
        editor.moveForward(originOffset)
    },
    moveDownward: (editor:Editor) => {
        let originOffset = editor.value.selection.focus.offset
        editor.moveToStartOfNextBlock()
        let rowLen = editor.value.focusText.text.length
        if (originOffset > rowLen) {
            originOffset = rowLen
        }
        editor.moveForward(originOffset)
    },
    moveForward: (editor:Editor) => {
        editor.moveForward()
    },
    moveBackward: (editor:Editor) => {
        editor.moveBackward()
    }
}

let markMove = {
    moveForward: (editor:Editor) => {
        editor.moveFocusForward()
    },
    moveBackward: (editor:Editor) => {
        editor.moveFocusBackward()
    },
    moveUpward: (editor: Editor) => {
        let originOffset = editor.value.selection.focus.offset
        editor.moveFocusToStartOfPreviousBlock()
        let rowLen = editor.value.focusText.text.length
        if (originOffset > rowLen) {
            originOffset = rowLen
        }
        editor.moveFocusForward(originOffset)
    },
    moveDownward: (editor: Editor) => {
        let originOffset = editor.value.selection.focus.offset
        editor.moveFocusToStartOfNextBlock()
        let rowLen = editor.value.focusText.text.length
        if (originOffset > rowLen) {
            originOffset = rowLen
        }
        editor.moveFocusForward(originOffset)
    }
}

function toggleRef(ref:any, editor:Editor) {
    if (ref.current === pointMove) {
        ref.current = markMove
    } else {
        ref.current = pointMove
        let focus = editor.value.selection.focus
        editor.moveAnchorTo(focus.path, focus.offset)
    }
}

function doCopy(editor: Editor) {
    (global as any).clipboard.writeText(serializeNode(editor.value.fragment))
}

function serializeNode(node:any):any {
    let delimiter = '\n'
    
    if (
        node.object == 'document' ||
        (node.object == 'block' && slate.Block.isBlockList(node.nodes))
    ) {
        return node.nodes.map(serializeNode).join(delimiter)
    } else {
        return node.text
    }
}

function deserialize(str:string):any {
    let delimiter = '\n'
  
    let defaultBlock = (slate as any).Node.createProperties('line')
  
    let json = {
        object: 'document',
        data: {},
        nodes: str.split(delimiter).map((line:any) => {
          return {
            ...defaultBlock,
            object: 'block',
            data: {},
            nodes: [
              {
                object: 'text',
                leaves: [
                  {
                    object: 'leaf',
                    text: line
                  },
                ],
              },
            ],
          }
        }),
    }    
  
    return slate.Document.fromJSON(json as any)
}

function doPaste(editor:Editor) {
    let text = (global as any).clipboard.readText()
    editor.insertFragment(deserialize(text))
}