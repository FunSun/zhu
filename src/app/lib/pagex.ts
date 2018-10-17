/*
    pagex source to React.ReactNode Object
*/

import * as _ from 'lodash'

export enum BlockType {
    ThermaticBreak,
    Heading,
    IndentBlock,
    FencedBlock,
    TagTrunk,
    Paragraph,
    Table
}

export enum InlineType {
    Link,
    Bold,
    Italic,
    Image
}

interface PageXInline {
    type: InlineType
    content: string
    name?: string
}

interface PageXBlock {
    type: BlockType,
    ln: [number, number]
    meta?: any
    content?: (string|PageXInline)[],
    children?: PageXBlock[]
}

function toLines(input:string):string[] {
    return _.split(input, '\n')
}

function trimOptionalSpace(line:string): string{
    return line
    // let startSpaces = 0
    // for (let i=0; i< line.length; i++) {
    //     if (line[i] !== ' ') {
    //         break
    //     }
    // }
    // line = line.trimLeft()
    // return (startSpaces >= 4)? (_.repeat(' ', startSpaces) + line):line
}

function isBlankLine(line:string):boolean {
    if (line.length === 0) {
        return true
    }
    for (let i=0; i<line.length; i++) {
        if (line[i] !== ' ') {
            return false
        }
    }
    return true
}

function isThematicBreak(line:string): boolean {
    line = trimOptionalSpace(line)
    return _.startsWith(line, '---')
}

function parseThematicBreak(lines:string[], ln:number): [any, number] {
    return [{type: BlockType.ThermaticBreak, ln: [ln, ln]}, ln+1]
}

function isATXHeading(line:string):boolean {
    line = trimOptionalSpace(line)
    return line[0] === '#'
}

function parseATXHeadings(lines:string[], ln:number): [PageXBlock, number] {
    let line  = lines[ln]
    line = _.trimStart(line, ' ')
    let i = 0
    for (; i< line.length; i++) {
        if (line[i] !== '#') {
            break
        }
    }
    line = _.trimStart(line, '#')
    line = _.trimEnd(line, ' ')
    line = _.trimEnd(line, '#')
    return [{
        type: BlockType.Heading,
        meta: i,
        content: [line],
        ln: [ln, ln]
    }, ln+1]
}

function isIndentBlock(line: string): boolean {
    return _.startsWith(line, '    ')
}

function parseIndentBlock(lines: string[], ln:number):[PageXBlock, number] {
    let contentLines:string[] = []
    let i = ln
    while (i < lines.length) {
        let line = lines[i]
        if (!_.startsWith(line, '    ') && isBlankLine(line)) {
            break
        }
        contentLines.push(line.slice(4))
        i += 1
    }
    return [{
        type: BlockType.IndentBlock,
        content: contentLines,
        ln: [ln, i-1]
    }, i]

}

function isFencedBlock(line:string):boolean {
    return _.startsWith(line, '```')
}

function parseFencedBlock(lines:string[], ln:number):[PageXBlock, number] {
    let meta = _.trimStart(lines[ln], '```')
    let i = ln + 1
    let contentLines:string[] = []
    while (i < lines.length) {
        let line = lines[i]
        if (_.startsWith(line, '```')) {
            i += 1
            break
        }
        contentLines.push(line)
        i += 1
    }
    return [{
        type: BlockType.FencedBlock,
        meta: meta,
        content: contentLines,
        ln: [ln, i-1]
    }, i]
}

function isTagTrunk(line:string):boolean {
    if (line && line[0] === '<' && line[1] !== " ") {
        return true
    }
    return false
}

function parseTagTrunk(lines:string[], ln:number):[PageXBlock, number] {
    return [{
        type: BlockType.TagTrunk,
        content: [lines[ln]],
        ln: [ln, ln]
    }, ln+1]
}

function isTable(line:string):boolean {
    return line[0] === '|'
}

function parseTable(lines: string[], ln:number): [PageXBlock, number] {
    let i = ln
    let contentLines = []
    while (i < lines.length) {
        let line = lines[i]
        if (line[0] !== '|') {
            break
        }
        contentLines.push(line)
        i+=1
    }
    return [{
        type: BlockType.Table,
        content: contentLines,
        ln: [ln, i-1]
    }, i]
}

function parseParagraph(lines: string[], ln: number): [PageXBlock, number] {
    // if nextLine isThematicBreak; return
    let i = ln
    let contentLines = []
    while (i < lines.length) {
        if (isBlankLine(lines[i])) {
            break
        }
        let line = lines[i]
        if (_.startsWith(line, '#') || _.startsWith(line, '---')) {
            break
        }
        contentLines.push(line)
        i += 1
    }
    return [{
        type: BlockType.Paragraph,
        content: contentLines,
        ln: [ln, i-1]
    }, i]
}

function linesToBlocks(lines:string[]): PageXBlock[] {
    let ln = 0
    let blocks:any[] = []
    while (ln < lines.length) {
        if (isBlankLine(lines[ln])) {
            ln += 1
            continue
        }
        let line = lines[ln]
        let block = {}
        let next = 0    
        switch (true) {
            case isThematicBreak(line):
                [block, next] = parseThematicBreak(lines, ln)
                break
            case isATXHeading(line):
                [block, next] = parseATXHeadings(lines, ln)
                break
            case isIndentBlock(line):
                [block, next] = parseIndentBlock(lines, ln)
                break
            case isTable(line):
                [block, next] = parseTable(lines, ln)
                break
            case isFencedBlock(line):
                [block, next] = parseFencedBlock(lines, ln)
                break
            case isTagTrunk(line):
                [block, next] = parseTagTrunk(lines, ln)
                break
            default:
                [block, next] = parseParagraph(lines, ln)
        }
        blocks.push(block)
        ln = next
    }
    return blocks
}

function secondPass(blocks: PageXBlock[]): PageXBlock[] {
    for (let i=0; i< blocks.length; i++) {
        let block = blocks[i]
        if (block.type !== BlockType.Paragraph) {
            continue
        }
        let content = block.content
        block.content = _.flatMap(content, (line:string) => {
            line = line.replace(/!\[(.*?)\]\((.*?)\)/g, '~~~~~%%%%%$1#####$2~~~~~')            
            line = line.replace(/\[(.*?)\]\((.*?)\)/g, '~~~~~?????$1#####$2~~~~~')
            let trunks = _.filter(_.split(line, '~~~~~'), (o) => o !== "")
            let res = _.map(trunks, (trunk) => {
                if (_.startsWith(trunk, '?????')) {
                    let parts = _.split(_.trimStart(trunk, '?????'), '#####')
                    return {
                        type: InlineType.Link,
                        content: parts[1],
                        name: parts[0]
                    }
                } else if (_.startsWith(trunk, '%%%%%')) {
                    let parts = _.split(_.trimStart(trunk, '%%%%%'), '#####')
                    return {
                        type: InlineType.Image,
                        content: parts[1],
                        name: parts[0]
                    }
                }
                return trunk
            })
            return [...res, '\n']
        })
    }
    return blocks
}

export function parse(input: string): PageXBlock[] {
    let lines = toLines(input)
    let blocks = linesToBlocks(lines)
    return secondPass(blocks)
}