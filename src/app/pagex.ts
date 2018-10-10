import * as _ from 'lodash'
import {transform} from 'sucrase'
import * as showdown from 'showdown'

const converter = new showdown.Converter()
converter.setFlavor("github")

function centrifugePageX(source: string) {
    return {
        "markdownBlocks": [source],
        "jsxElements": [""]
    }
}

function markdownToHtml(source:string) {
    return converter.makeHtml(source)
}

function htmlToJsx(source:string) {
    return source.replace(/class=/g, 'className=')
}

function joinJSX(template: string[], snippets:string[]) {
    return `target = <article className="markdown-body">${template[0]}</article>`
}

export function parse(pagex:string):string {
    let {markdownBlocks,jsxElements} = centrifugePageX(pagex)
    let jsxTempaltes = _.map(markdownBlocks, (block) => {
        return htmlToJsx(markdownToHtml(block))
    })
    let finalJsx = joinJSX(jsxTempaltes, jsxElements)
    return transform(finalJsx, {transforms: ["jsx"]}).code
}