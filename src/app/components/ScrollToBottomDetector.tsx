import * as React from 'react'

interface ComponentProps {
    onScrollToEnd():void
}

export default class ScrollToBottomDetector extends React.Component<ComponentProps> {
    componentDidMount() {
        window.addEventListener('scroll', this.handleScroll.bind(this), false)
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll.bind(this), false)
    }
    
    handleScroll() {
        if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
            this.props.onScrollToEnd()
        }
    }
    render() {
        return <div style={{"display": "none"}}></div>
    }
}