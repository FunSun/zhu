import React, {useRef, useEffect, useState} from "react"
import * as _ from 'lodash'

interface Props {
    children: React.ReactChild[]
    onScrollToEnd():void
}

export default function (props:Props) {
    const ref = useRef(null)
    const signaled = useRef(false)
    const [height, setHeight] = useState(window.innerHeight - 64)
    const handleResize = () => {
        setHeight(window.innerHeight - 64)
    }

    const handleScroll = () => {
        let node = ref.current as HTMLElement
        if ((node.scrollHeight - node.scrollTop) <= (height + 220)) {
            if (signaled.current) {
                return
            }
            signaled.current = true
            props.onScrollToEnd()
        } else {
            signaled.current = false
        }
    }

    useEffect(() => {
        if (!ref.current) {
            return () => {}
        }
        let node = ref.current as HTMLElement
        window.addEventListener('resize', handleResize, false)
        node.addEventListener('scroll', handleScroll, false)
        return () => {
            window.removeEventListener('resize', handleResize, false)
            node.removeEventListener('scroll', handleScroll, false)
    
        }
    }, [ref.current])

    return (<div ref={ref} style={{overflowY: 'scroll', width:'100%', height: height, paddingTop: 30, paddingBottom:30, display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
        {props.children}
    </div>)

}

