import * as _ from 'lodash'
import {transform} from 'sucrase'

interface LineReader {
    err: string
    canRead(line:string):boolean
    canFinish():boolean
    read(line: string):void
}

class GeneralLineReader {
    readers: LineReader[] = []
    cur: LineReader = null
    eatLine(line: string) {
        if (this.cur) {
            if (this.cur.canRead(line)) {
                this.cur.read(line)
                return
            } else if (!this.cur.canFinish()) {
                throw this.cur.err
            }
            this.readers.push(this.cur)
        }
        this.cur = this.makeNewReader(line)
        this.cur.read(line)
    }
    
    makeNewReader(line:string):LineReader {
        if (HeaderReader.canStart(line)) {
            return new HeaderReader()
        } else if (ListReader.canStart(line)) {
            return new ListReader()
        } else if (TagReader.canStart(line)) {
            return new TagReader()
        } else if (CodeBlockReader.canStart(line)) {
            return new CodeBlockReader()
        } else if (ParagraphReader.canStart(line)) {
            return new ParagraphReader()
        } else {
            return new BlankReader()
        }
    }
    toString():string {
        let res = ['target = <article>']
        for (let r of this.readers) {
            res.push(r.toString())
        }
        res.push('</article>')
        return res.join("\n")
    }
}

class HeaderReader {
    err = "Header"
    content: string = ""
    static canStart(line:string):boolean {
        return _.startsWith(line, '#')
    }
    canRead(line:string):boolean {
        return false
    }
    canFinish():boolean {
        return true
    }
    toString():string {
        let [head, ...rest] = _.split(this.content, ' ')
        let lvl = head.length.toString()
        return `<h${lvl}>${rest.join(" ")}</h${lvl}>`
    }
    read(line:string):void {
        this.content = line
    }
}

class ParagraphReader {
    err = "Paragraph"
    finished:boolean = false
    content = ""
    static canStart(line:string) {
        return line.length > 0
    }
    canRead(line:string) {
        if (this.finished) {
            return false
        }
        if (_.startsWith(line, '<')) {
            this.finished = true
            return false
        }
        if (_.startsWith(line, '#')) {
            this.finished = true    
            return false
        }
        if (_.startsWith(line, '-')) {
            this.finished = true    
            return false
        }
        if (_.startsWith(line, '```')) {
            this.finished = true    
            return false
        }
        return true
    }
    canFinish() {
        return this.finished
    }
    toString() {
        let res = this.content.replace(/\n/g, '<br/>')
        return `<p>${res}</p>`
    }
    read(line:string) {
        if (line === '') {
            this.finished = true
        } else {
            this.content += line + "\n"
        }
    }
}

class CodeBlockReader {
    err = "Code"
    finished:boolean = false
    isEndLine: boolean = false
    content:string = ""
    static canStart(line:string) {
        return _.startsWith(line, '```')
    }
    canRead(line:string) {
        return !this.finished
    }
    canFinish() {
        return this.finished
    }
    toString() {
        return `<pre><code>${this.content}</code></pre>`
    }
    read(line:string) {
        if (_.startsWith('```')) {
            if (this.isEndLine) {
                this.finished = true
            } else {
                this.isEndLine = true
            }
        }
        this.content += line + '\n'
        
    }
}

class ListReader {
    err = "List"
    content:string[] = []
    static canStart(line:string) {
        return _.startsWith(line, '-')
    }
    canRead(line:string) {
        return _.startsWith(line, '-')
    }
    canFinish() {
        return true
    }
    toString() {
        let res = _.map(this.content, (o) => {
            return `<li>${o}</li>`
        })
        return `<ul>${res.join('\n')}</ul>`
    }
    read(line:string) {
        this.content.push(_.trimStart(line, '- '))
    }
}

class TagReader {
    err = "Tag"
    closed:boolean = true
    content = ""
    tag = ""
    tagNest = 0
    static canStart(line:string) {
        return _.startsWith(line, '<')
    }
    canRead(line:string) {
        return this.tagNest > 0
    }
    canFinish() {
        if (this.tagNest > 0) {
            this.err = "Tag: nest remaining: " + this.tagNest.toLocaleString()
        }
        if (this.tagNest< 0) {
            this.err = "Tag: nest unbalanced"
        }
        return this.tagNest === 0
    }
    toString():string {
        return this.content
    }
    read(line:string) {
        if (this.tag === "") {
            this.tag = line.match(/^<([^ >]+).*$/)[1]
        }
        this.tagNest += (line.match(new RegExp("<"+this.tag, 'g')) || []).length
        this.tagNest -= (line.match(new RegExp("</"+this.tag, 'g')) || []).length
        this.content += line + '\n'
    }
}

class BlankReader {
    err = "Blank"
    canRead(line:string) {
        return line.length === 0
    }
    canFinish() {
        return true
    }
    toString() {
        return ""
    }
    read(line:string) {}
}

export function parse(code:string):string {
    let lines = code.split('\n')
    let glr = new GeneralLineReader()
    for (let ln=1;ln<lines.length+1; ln++) {
        try {
            glr.eatLine(lines[ln-1])
        } catch(e) {
            console.log("Ln %d parse error: %s, %s", ln, lines[ln-1], e)
        }
        
    }
    return transform(glr.toString(), {transforms: ["jsx"]}).code
}