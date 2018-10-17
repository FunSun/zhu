import * as React from 'react'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import * as _ from 'lodash'

interface Props {
    children: string
}

function splitCols(content:string) {
    return _.map(_.filter(_.split(content, '|'), (o) => (o!=='')), _.trim)
}

export default function (props:Props) {
    let source = props.children
    let sourceRows = _.split(source, '\n')
    let head, body
    if (sourceRows.length>2 && _.startsWith(sourceRows[1], '|---')) {
        head = sourceRows[0]
        body = sourceRows.slice(2)
    } else {
        body = sourceRows
    }
    
    let headRow = (<TableRow>
        {_.map(splitCols(head), (part) => {
            return <TableCell>{part}</TableCell>
        })}
    </TableRow>)
    let bodyRows = []
    for (let i=0; i< body.length; i++) {
        let cols = _.map(splitCols(body[i]), (col) => {
            return <TableCell>{col}</TableCell>
        })
        bodyRows.push(<TableRow key={i}>
            {cols}
        </TableRow>)
    }
    return (<Table>
        <TableHead>{headRow}</TableHead>
        <TableBody></TableBody>
        <TableBody>
            {bodyRows}
        </TableBody>

    </Table>)
}
