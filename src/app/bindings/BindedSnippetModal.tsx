import React from "react"
import * as _ from 'lodash'
import {bindWith} from './base'
import SnippetModal from '../components/SnippetModal'
import SnippetStore from '../stores/snippetStore'

function parseText(v: string) {
    let content = v
    let tags = ["未分类"]
    let lines = _.split(v, "\n")
    if (lines.length > 1) {
        tags = _.map(_.filter(_.split(lines[0], " "), (token) => {return token !== "" && token !== " "}), (token:string) => {
            return _.trimStart(token, '@')
        })
        content = _.join(lines.slice(1), "\n")
    }
    return {content, tags}
}

interface bindProps {
    snippetStore: SnippetStore
}

export default bindWith(["snippetStore"], (props:bindProps) => {
    let store = props.snippetStore

    let onClose = () => {store.hideSnippetModal()}
    let onSubmit = (v:string) => {
        let {content, tags} = parseText(v)
        store.submitSnippet(content, tags)
    }


    return <SnippetModal
        visible={store.visible}
        content={store.content}
        onClose={onClose}
        onSubmit={onSubmit}
    ></SnippetModal>

})

