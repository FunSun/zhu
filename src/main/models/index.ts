import * as crypto from 'crypto'

export enum Types {
    Link = 'link',
}

export class Tag {
    name: string
    parent: Tag
    children: Tag[]

    constructor(name: string) {
        this.name = name
    }

    toString(): string {
        return this.name
    }
}

export class Resource {
    id: string
    tags: Tag[]
    created: Date
    constructor(id: string) {
        this.id = id
        this.tags = []
        this.created = new Date()
    }
}

export class FamousResource extends Resource {
    from: string
}

export class Link extends Resource {
    from: string
    title: string
    favicon: string

    constructor(id: string, title: string, from:string, favicon: string) {
        super(id)
        this.id = id
        this.title = title
        this.from = from
        this.favicon = favicon
        this.created = new Date()
    }
}

// export class Task extends Resource {
//     constructor(content:string, tags?:Tag[]) {
//         super()
//         this.content = content
//         this.tags = tags || []
//     }
//     content: string
//     done: boolean
// }

export class PageX extends Resource {
    content: string    
    constructor(id: string, content:string) {
        super(id)
        this.content = content
    }
}

export function getUUID(): string {
    return hashCode(Date.now().toString())
}
export function hashCode(s: string): string {
    return crypto.createHash('md5').update(s).digest('base64')
}
