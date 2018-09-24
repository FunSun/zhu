import * as React from "react"
import ResourceList from './ResourceList'
import ResourceStore from '../stores/resourceStore'
import { inject, observer } from "mobx-react"

const styles = {
    inputStyle: {borderWidth: 0, width: 600, height: 30, lineHeight: 30, color: '#1a1a1a', fontSize: 14, backgroundColor: '#ffffff', margin: 'auto', paddingLeft: 14, borderRadius: 3}
}

@inject('resourceStore')
@observer
export default class App extends React.Component {
    state: { query: string}
    constructor(props:any) {
        super(props)
        this.state = {
            query: ""
        }
    }

    handleKeyDown (e:any) {
        if(e.key == 'Enter'){
            let rs = (this.props as any).resourceStore as ResourceStore
            rs.reload(e.target.value)
         }        
    }

    render() {

        return (<div style={{width:'100%'}}>
            <div style={{width: '100%', height: 60, backgroundColor: '#1890ff', display: 'flex'}}>
                <input style={styles.inputStyle} value={this.state.query} onChange={(e) => this.setState({query: e.target.value})} onKeyDown={this.handleKeyDown.bind(this)}></input>
            </div>
            <ResourceList></ResourceList>
        </div>)
    }
}