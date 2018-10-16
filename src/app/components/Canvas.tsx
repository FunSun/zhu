import * as React from 'react'
import * as _ from 'lodash'

interface Props {
    dsl: string
    ctx?: any
    width?: number
    height?: number
}

function filledShapeBase(ctx:any, points:any[]) {
    if (points.length <= 2) {
        return
    }
    ctx.fillStyle = "blue"
    ctx.fillRect(0, 0, 400, 400)
    ctx.fillStyle = "green"    
    ctx.beginPath()
    var firstDot =  points[0]
    ctx.moveTo(firstDot[0]+200, 200-firstDot[1])
    _.each(points.slice(1), point => {
        ctx.lineTo(point[0]+200, 200-point[1])
    })
    ctx.fill()
}

export default class Canvas extends React.Component<Props> {
    ref:any

    constructor(props:Props) {
        super(props)
        this.ref = React.createRef()
    }

    componentDidMount() {
        this.refreshCanvas()
    }

    componentWillReceiveProps() {
        this.refreshCanvas()
    }

    refreshCanvas() {
        let node = this.ref.current as HTMLCanvasElement
        let drawCtx = node.getContext('2d')
        let ctx = this.props.ctx || {}
        let filledShape = filledShapeBase.bind(null, drawCtx)
        let f:any
        try {        
            eval("f = (ctx, drawArea)=>{ " + this.props.dsl + " }")
            f(ctx, filledShape)
        } catch(e) {
            console.log(e)
        }
    }

    render () {
        return <canvas width={400} height={400} style={{ margin: 8, width: 400, height: 400}} ref={this.ref}></canvas>
    }
}
