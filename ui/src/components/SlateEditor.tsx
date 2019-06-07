import React, { useState, useMemo, useRef} from 'react'

import Plain from 'slate-plain-serializer'
import {Editor} from 'slate-react' 
import * as slate from 'slate'

interface Props {
    value: string
    onChange(val: slate.Value):void
    onSave(content: string):void
}

export default function (props: Props) {
    let [val, setVal] = useState(Plain.deserialize(props.value))
    useMemo(() => {
        setVal(Plain.deserialize(props.value))
    }, [props.value])
    const onChange = (value:slate.Value) => {
        props.onChange(value)
        setVal(value)
    }
    let keyboardHandler = useKeyHandler(props)
    return <Editor style={{fontSize: 14}} placeholder="" value={val} onKeyDown={keyboardHandler} onChange={({value})=>{onChange(value)}}></Editor>
    }

function useKeyHandler(props:Props):any {
    let ref = useRef(PointMoveAction)
    return (e: KeyboardEvent, editor:Editor, next:()=> any) => {
        if (e.ctrlKey) {
            e.preventDefault()
            let actions = new ref.current(editor)
            switch (e.key) {
                case "a":
                return actions.moveToStartOfLine()
                case "e":
                return actions.moveToEndOfLine()
                case "f":
                return actions.moveForward()
                case "b":
                return actions.moveBackward()
                case "p":
                return actions.moveUpward()
                case "n":
                return actions.moveDownward()
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

function toggleRef(ref:any, editor:Editor) {
    if (ref.current === PointMoveAction) {
        ref.current = MarkMoveAction
    } else {
        ref.current = PointMoveAction
        let focus = editor.value.selection.focus
        editor.moveAnchorTo(focus.path, focus.offset)
    }
}

function doCopy(editor: Editor) {
    navigator.clipboard.writeText(serializeNode(editor.value.fragment))
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
    navigator.clipboard.readText().then((text) => {
        editor.insertFragment(deserialize(text))
    })
}

interface MoveAction {
    moveToStartOfLine():void
    moveToEndOfLine():void
    moveForward():void
    moveBackward():void
    moveUpward(): void
    moveDownward():void
}

class PointMoveAction implements MoveAction {
    editor: Editor
    constructor(editor:Editor) {
        this.editor = editor
    }
    moveToStartOfLine():void {
        this.editor.moveToStartOfBlock()
    }
    moveToEndOfLine(): void {
        this.editor.moveToEndOfBlock()
    }
    moveForward(): void {
        this.editor.moveForward()        
    }
    moveBackward(): void {
        this.editor.moveBackward()
    }
    moveUpward(): void {
        let editor = this.editor
        let originOffset = editor.value.selection.focus.offset
        editor.moveToStartOfPreviousBlock()
        let rowLen = editor.value.focusText.text.length
        if (originOffset > rowLen) {
            originOffset = rowLen
        }
        editor.moveForward(originOffset)
    }
    moveDownward(): void {
        let editor = this.editor
        let originOffset = editor.value.selection.focus.offset
        editor.moveToStartOfNextBlock()
        let rowLen = editor.value.focusText.text.length
        if (originOffset > rowLen) {
            originOffset = rowLen
        }
        editor.moveForward(originOffset)
    }
    
}

class MarkMoveAction implements MoveAction{
    editor: Editor
    constructor(editor:Editor) {
        this.editor = editor
    }
    moveToStartOfLine() {
        this.editor.moveFocusToStartOfBlock()
    }
    moveToEndOfLine() {
        this.editor.moveFocusToEndOfBlock()
    }
    moveForward() {
        this.editor.moveFocusForward()        
    }
    moveBackward() {
        this.editor.moveFocusBackward()
    }
    moveUpward() {
        let editor = this.editor
        let originOffset = editor.value.selection.focus.offset
        editor.moveFocusToStartOfPreviousBlock()
        let rowLen = editor.value.focusText.text.length
        if (originOffset > rowLen) {
            originOffset = rowLen
        }
        editor.moveFocusForward(originOffset)
    }
    moveDownward() {
        let editor = this.editor
        let originOffset = editor.value.selection.focus.offset
        editor.moveFocusToStartOfNextBlock()
        let rowLen = editor.value.focusText.text.length
        if (originOffset > rowLen) {
            originOffset = rowLen
        }
        editor.moveFocusForward(originOffset)
    }

}