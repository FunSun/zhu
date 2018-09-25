import * as React from "react"
import Heading from './Heading'
import ResourceList from './ResourceList'
import AddBlogModal from './AddBlogModal'

import { css } from 'glamor'

let appStyle = css({
    width:'100%',
    height: '100%',
    backgroundColor: '#d6e4ff'
})

export default class App extends React.Component {
    render() {
        return (<div {...appStyle} >
            <Heading></Heading>
            <ResourceList></ResourceList>
            <AddBlogModal></AddBlogModal>
        </div>)
    }
}