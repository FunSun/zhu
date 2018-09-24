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
    })

}

export interface ZhihuPreviewProps {
    title:string,
    link: string,
    desc: string
}

export default class ZhihuPreview extends React.Component<ZhihuPreviewProps,{}> {
    constructor(props:any) {
        super(props)
    }

    render() {
        return (
            <div style={styles.cardStyle}>
                <div>
                    <h2 style={{fontSize: 18, marginTop:-4, marginBottom: -4}}>
                        <a {...styles.linkStyle} href={this.props.link} target='_blank'>{this.props.title}</a>
                    </h2>
                </div>
                <div style={{marginTop: 6, marginBottom: 10, color: '#1a1a1a', fontSize: 15}}>
                    <div dangerouslySetInnerHTML={{'__html': this.props.desc}}></div>
                </div>
            </div>
        )
    }
}