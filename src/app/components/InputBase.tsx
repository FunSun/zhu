import * as React from 'react'
import InputBase from '@material-ui/core/InputBase'

type Props = {
    onSubmit?: (val: string) => void
    onChange?: (val: string) => void
    [key:string]:any
}

export default class HomebrowedInput extends React.Component<Props> {
    state: {val : string}
    constructor(props:Props) {
        super(props)
        this.state = {
            val: ""
        }
    }
    handleChange(e:any) {
        this.setState({val: e.target.value})
        if (this.props.onChange) {
            this.props.onChange(e.target.value)
        }
    }
    handleKeyDown (e:any) {
        if(e.key == 'Enter' && this.props.onSubmit){
            this.props.onSubmit(this.state.val)
         }        
    }

    render () {
        let {onSubmit, onChange, ...rest} = this.props
        return (<InputBase {...rest} value={this.state.val} onChange={(e) => this.handleChange(e)} onKeyDown={(e) => this.handleKeyDown(e)}></InputBase>)
    }
}
