import {parse} from './pagex'

let testContent =
String.raw`
# abcde
fdbcd
fekfke

fjekfjk
`
test("pagex", () => {
    let blocks = parse(testContent)
    console.log(blocks)
})