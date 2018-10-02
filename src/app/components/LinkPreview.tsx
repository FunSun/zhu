import * as React from "react"
import {style} from 'glamor'

const styles = {
    cardStyle:{
        backgroundColor: '#ffffff',
        width: 700,
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 16,
        paddingBottom: 16,
        margin: 8
    },
    linkStyle: style({
        color: '#1a1a1a',
        textDecoration: 'none',
        ":hover": {
            color: '#175199',
            textDecoration: 'none'
        }
    }),
    favicon: style({
        width: 16,
        height: 16,
        marginRight: 10
    })
}

export interface LinkPreviewProps {
    title:string,
    link: string,
    favicon: string
}

export default class LinkPreview extends React.Component<LinkPreviewProps,{}> {
    constructor(props:any) {
        super(props)
    }

    render() {
        return (
            <div style={styles.cardStyle}>
                <div>
                    <h2 style={{fontSize: 18, marginTop:-4, marginBottom: -4}}>
                        <span {...styles.favicon}><img src={this.props.favicon}></img></span><a {...styles.linkStyle} href={this.props.link} target='_blank'>{this.props.title}</a>
                    </h2>
                </div>
            </div>
        )
    }
}