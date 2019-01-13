import React, {useState} from 'react'

type Props = {
    onSubmit?: (val: string) => void
    onChange?: (val: string) => void
    [key:string]:any
}

export default function (props:Props) {
    const [val, setVal] = useState("")
    let {onSubmit, onChange, ...rest} = this.props

    const handleChange = (e:any) => {
        setVal(e.target.value)
        if (onChange) {
            onChange(e.target.value)
        }
    }
    const handleKeyDown = (e:any) => {
        if(e.key == 'Enter' && onSubmit){
            onSubmit(val)
         }        
    }

    return (<input {...rest} value={val} onChange={handleChange} onKeyDown={handleKeyDown}></input>)
}  
