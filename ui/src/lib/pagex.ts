import * as _ from 'lodash'

export enum BasicBlockType {
    ThermaticBreak = '---',
    Heading = '#',
    FencedBlock= '```',
    Paragraph = 'p',
    Image = 'img',
}

export interface PageBlock {
    type: string,
    data: any
}

export interface PageXBlock {
    type: string,
    ln: [number, number]
    data?: any
}

type BlockParser = (lines:string[], ln:number) => [PageXBlock, number]

function parseBlankLine(lines:string[], ln:number): [PageXBlock, number]{
    return [null, ln+1]
}

function parseThematicBreak(lines:string[], ln:number): [PageXBlock, number] {
    return [{type: BasicBlockType.ThermaticBreak, data:null, ln: [ln, ln]}, ln+1]
}

function parseATXHeadings(lines:string[], ln:number): [PageXBlock, number] {
    let line  = lines[ln]
    let i = 0
    for (; i< line.length; i++) {
        if (line[i] !== '#') {
            break
        }
    }
    line = _.trimStart(line, '#')
    line = _.trimStart(line, ' ')
    line = _.trimEnd(line, ' ')
    return [{
        type: BasicBlockType.Heading,
        data: {
            lvl: i,
            title: line,
        },
        ln: [ln, ln]
    }, ln+1]
}

function parseFencedBlock(lines:string[], ln:number):[PageXBlock, number] {
    let meta = _.trimStart(lines[ln], '```')
    meta = _.trimEnd(meta, ' ')
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
    let block:PageXBlock = null
    if (_.indexOf(['link', 'tags'], meta) >= 0) {
        block = {
            type: meta,
            data: JSON.parse(contentLines.join("\n")),
            ln: [ln, i-1]
        }
    } else {
        block = {
            type: BasicBlockType.FencedBlock,
            data: {
                meta: meta,
                raw: contentLines.join('\n')
            },
            ln: [ln, i-1]
        }
    }
    return [block, i]
}

function parseParagraph(lines: string[], ln: number): [PageXBlock, number] {
    let i = ln
    let contentLines = []
    while (i < lines.length) {
        if (/^[ \t]*$/.exec(lines[i])) {
            break
        }
        let line = lines[i]
        contentLines.push(line)
        i += 1
    }
    return [{
        type: BasicBlockType.Paragraph,
        data: contentLines.join("\n"),
        ln: [ln, i-1]
    }, i]
}

function parseImage(lines: string[], ln: number): [PageXBlock, number] {
    let line = lines[ln]
    let reg = /^!\[(.*)\]\((.*)\)$/
    let res = reg.exec(line)
    if (!res || res.length < 3) {
        console.log(`malformed syntax for parseImage: ${line}`)
        return [{
            type: BasicBlockType.Paragraph,
            data: line + '\n',
            ln: [ln, ln],
        }, ln+1]
    }
    return [{
        type: BasicBlockType.Image,
        data: {
            "title": res[1],
            "url": res[2]
        },
        ln: [ln, ln],
    }, ln+1]
}

const blockParsers:[RegExp, BlockParser][] = [
    [/^[ \t]*$/, parseBlankLine],
    [/^[ \t]/, parseParagraph],
    [/^#+[ \t]/, parseATXHeadings],
    [/^---/, parseThematicBreak],
    [/^```/, parseFencedBlock],
    [/^!\[/, parseImage],
    [/^.*$/, parseParagraph]
]

export function parse(input: string): PageXBlock[] {
    let lines = _.split(input, '\n')
    let ln = 0
    let blocks:PageXBlock[] = []
    try {
        while (ln < lines.length) {
            let chosenParser = null
            for (let [prefix, blockParser] of blockParsers) {
                if (prefix.exec(lines[ln])) {
                    chosenParser = blockParser
                    break
                }
            }
            let[block, next] = chosenParser(lines, ln)
            if (!!block) {
                blocks.push(block)
            }
            ln = next
        }
    } catch (err) {
        console.log(`parser error in line: ${ln+1} content: ${input} err:${err}`)
    }
    return blocks
}

export function stringify(blocks: PageBlock[]):string {
    return _.map(blocks, (block) => {
        switch (block.type) {
            case 'p':
            return block.data + '\n'
            case '#':
            return _.repeat('#', block.data.lvl) + " " + block.data.title
            case '---':
            return '---'
            case '```':
            return '```' + block.data.meta + '\n' + block.data.raw + '\n```'
            case 'img': 
            return `![${block.data.title}](${block.data.url})`
            default: 
            return '```' + block.type + '\n' + JSON.stringify(block.data) + '\n```'
        }
    }).join("\n")
}