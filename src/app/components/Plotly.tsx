import React from 'react'
import * as _ from 'lodash'

const createPlotlyComponent  = require('react-plotly.js/factory') as any
const OriginPlot = createPlotlyComponent(Plotly) as any

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