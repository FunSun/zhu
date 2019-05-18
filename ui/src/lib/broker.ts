export class BrokerCommand {}

export type word = {text:string | command, start:number, end:number}
export type command = {words: word[], start:number, end:number}

function isCommand(cmd: string | command): cmd is command {
    return (<command>cmd).words !== undefined
}

class Source {
    source: string
    i:number
    constructor(source:string) {
        this.source = source
        this.i = 0
    }

    peek():string {
        return this.source[this.i]
    }

    incr() {
        this.i++
    }
    end(): boolean {
        return this.i >= this.source.length
    }

    getCommand():command {
        let words = []
        let start = this.i
        while(true) {
            this.trySkipBlank()
            switch(this.peek()) {
                case '{':
                words.push(this.getRaw())
                break
                case '"':
                words.push(this.getStr())
                break
                case '[':
                words.push(this.getSubCmd())
                break
                case ']':
                case '\n':
                case ';':
                this.incr()
                return {words, start, end:this.i}
                default:
                words.push(this.getAtom())
            }
        }
    }

    trySkipBlank() {
        let ch = this.peek()
        while (ch == ' ' || ch == '\t') {
            this.incr()
            ch = this.peek()
        }
    }

    getAtom():word {
        let start = this.i
        let ch = this.peek()
        while(ch !=' ' && ch != '\t' && ch != '\n' && ch != ';' && ch !=']') {
            this.incr()
            ch = this.peek()
        }
        return {text:this.source.slice(start, this.i), start, end:this.i}
    }

    getRaw(): word {
        this.incr()
        let needEndBrackets = 1
        let start = this.i
        while (this.peek() !== '}' || needEndBrackets !== 1) {
            switch (this.peek()) {
                case '}':
                needEndBrackets -= 1
                break
                case '{':
                needEndBrackets += 1
                break
                case '\\':
                if (this.source[this.i+1]=='{' || this.source[this.i+1]=='{') {
                    this.incr()
                }
                break
                default:
            }
            this.incr()
        }
        let res = this.source.slice(start, this.i).replace('\\{', '{').replace('\\}', '}')
        this.incr()
        return {text:res, start, end:this.i}
    }

    getStr(): word {
        this.incr()
        let start = this.i
        while (this.peek() != '"') {
            if (this.peek() == '\\' && this.source[this.i + 1] == '"') {
                this.incr()
            }
            this.incr()
        }
        let res = this.source.slice(start, this.i).replace('\\"', '"')
        this.incr()
        return {text:res, start, end:this.i}
    }
    getSubCmd(): word {
        this.incr()
        let start = this.i
        let cmd  = this.getCommand()
        return {text: cmd, start, end:this.i}
    }
}

export function parse(source:string):command[]{
    let src = new Source(source+'\n')
    let cmds = []
    while (!src.end()) {
        let cmd = src.getCommand()
        if (cmd.words.length !== 0) {
            cmds.push(cmd)
        }
    }
    return cmds
}

let testSrc = `
# 这是一个测试内容
p [# 战斗] {
    这是一个段落哦
噢噢噢噢噢噢噢噢
}
`
let ast = parse(testSrc)

function run(cmd:command):string {
    let args = []
    for (let word of cmd.words) {
        if (isCommand(word.text)) {
            args.push(run(word.text))
        } else {
            args.push(word.text)
        }
    }
    switch(args[0]) {
        case '#':
            return `<h1>${args[1]}</h1>`
            break
        case 'p':
            return args[1] + args[2]
    }
    return ""
}
for (let cmd of ast) {
    let res = run(cmd)
    console.log(res)
}
