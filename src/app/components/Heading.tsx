import * as React from "react"
import { inject, observer } from "mobx-react"
import ResourceStore from '../stores/resourceStore'
import * as addIcon from '../assets/add-icon.svg'
import { css } from 'glamor'
import UIStore from "../stores/uiStore"
import Input from "./Input"

const styles = {
    input: css({
        borderWidth: 0,
        width: 600,
        height: 30,
        lineHeight: 30,
        color: '#1a1a1a',
        fontSize: 14,
        backgroundColor: '#ffffff', 
        margin: 'auto', 
        paddingLeft: 14, 
        borderRadius: 3
    }),
    addButton: css({}),
    left: css({
        flexGrown: 1,
        width: 100,
        margin: 'auto 0',
        paddingLeft: 70        
    }),
    middle: css({
        flexGrown: 2,
        margin: 'auto 0'
    }),
    right: css({
        flexGrown: 1,
        width: 100,        
        margin: 'auto 0',
        paddingRight: 70
    }),
    container: css({
        width: '100%',
        height: 60,
        backgroundColor: '#1890ff',
        display: 'flex',
        justifyContent: 'space-between'
    })
}

@inject('resourceStore', 'uiStore')
@observer
export default class Heading extends React.Component {

    handleShowAddResourceModal() {
        let us = (this.props as any).uiStore as UIStore
        us.showAddBlogModal()
    }

    handleSubmit(val:string) {
        let rs = (this.props as any).resourceStore as ResourceStore
        rs.reload(val)
    }

    render() {
        console.log(styles.input)
        return (<div {...styles.container}>
            <div {...styles.left}></div>
            <div {...styles.middle}>
                <Input {...styles.input} onSubmit={(val) => this.handleSubmit(val)}></Input>
            </div>
            <div {...styles.right}>
                <span onClick={() => {this.handleShowAddResourceModal()}} {...styles}><img src={addIcon}></img></span>
            </div>

        </div>)
    }
}