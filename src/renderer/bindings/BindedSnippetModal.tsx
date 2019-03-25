import React from "react"
import * as _ from 'lodash'
import SnippetModal from '../components/SnippetModal'
import useSnippetStr from '../stores/snippet'
import { observer } from "mobx-react-lite"

function parseText(v: string) {
    let content = v
    let tags = ["未分类"]
    // let lines = _.split(v, "\n")
    // if (lines.length > 1) {
    //     tags = _.map(_.filter(_.split(lines[0], " "), (token) => {return token !== "" && token !== " "}), (token:string) => {
    //         return _.trimStart(token, '@')
    //     })
    //     content = _.join(lines.slice(1), "\n")
    // }
    return {content, tags}
}

export default observer(()=> {
    let store = useSnippetStr()

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
