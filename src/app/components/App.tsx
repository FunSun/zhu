import * as React from "react"
import Heading from './Heading'
import ResourceList from './ResourceList'
import AddBlogModal from './AddBlogModal'
import EditTagModal from './EditTagModal'

import { css } from 'glamor'

let appStyle = css({
    width:'100%',
    minHeight: '1000px',
    backgroundColor: '#d6e4ff'
})

export default class App extends React.Component {
    render() {
        return (<div {...appStyle} >
            <Heading></Heading>
            <ResourceList></ResourceList>
            <AddBlogModal></AddBlogModal>
            <EditTagModal></EditTagModal>
        </div>)
    }
}