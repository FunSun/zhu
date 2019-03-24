import React from 'react'
import * as _ from 'lodash'

let _orginPlot:any = null
function getOriginPlot(): any {
    if (!_orginPlot) {
        _orginPlot =  (global as any).createPlotlyComponent.default((global as any).Plotly) as any
    }
    return _orginPlot
}

interface Props {
    children: string
}
export function Plot(props:Props) {
    const OriginPlot = getOriginPlot()
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