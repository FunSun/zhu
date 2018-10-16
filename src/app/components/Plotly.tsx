import * as React from 'react'
const createPlotlyComponent  = require('react-plotly.js/factory') as any
const OriginPlot = createPlotlyComponent(Plotly) as any
import * as _ from 'lodash'

interface Props {
    children: string
}
export function Plot(props:Props) {
    let infos = _.split(props.children, '---')
    try {
        let data = _.map(infos, (info) => {
            return JSON.parse('{' + info + '}')
        })
        return <OriginPlot data={data}></OriginPlot>        
    } catch (e) {
        console.log(e)
        return <div></div>
    }
}