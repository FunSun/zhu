
export interface Index {
    add(id:string, text: string):void
    update(id:string, text: string):void
    search(query:string):Promise<any>
    remove(id:string):void
}

export function create():Index
export function create(options:any):Index