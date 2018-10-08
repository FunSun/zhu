import { parse } from './pagex'

let data:string = `
# A title
First paragraph

Second paragrah
with additon line

- list1
- list2
- list3
<span></span>
<div>
    some contetn
</div>


`

test("pagex parse", () => {
    let res = parse(data)
    console.log(res)
})