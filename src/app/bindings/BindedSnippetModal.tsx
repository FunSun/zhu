import React from "react"
import * as _ from 'lodash'
import {bind, BindingProps} from './base'
import SnippetModal from '../components/SnippetModal'

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

export default bind((props:BindingProps) => {
    let visible = props.ui.snippetModalVisible
    let content = props.ui.snippetModalContent
    let onClose = () => {props.ui.hideSnippetModal()}
    let onSubmit = (v:string) => {
        let {content, tags} = parseText(v)
        props.resource.addSnippet(content, tags)
        props.ui.hideAddCommentModal()
    }

    return <SnippetModal
        visible={visible}
        content={content}
        onClose={onClose}
        onSubmit={onSubmit}
    ></SnippetModal>

})

