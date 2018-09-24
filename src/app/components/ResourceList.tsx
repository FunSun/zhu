import * as React from "react"
import { inject, observer } from "mobx-react"
import ResourceStore from '../stores/resourceStore'
import * as _ from 'lodash'
import ZhihuPreview from "./ZhihuPreview"

@inject('resourceStore')
@observer
export default class App extends React.Component {
    constructor(props:any) {
        super(props)
    }

    render () {
        const rs = (this.props as any).resourceStore as ResourceStore
        let previews = _.map(rs.resources, (resource:any) => {
            return <ZhihuPreview title={resource.title} link={resource.from} desc={resource.highlight}></ZhihuPreview>
        })
        return (<div style={{width:'100%', backgroundColor: '#d6e4ff', paddingTop: 30, paddingBottom:30, display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
            {previews}
        </div>)
    }
}


