import React, { Component } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Link } from 'react-router-dom'
import chroma from 'chroma-js'
import { withStyles} from '@material-ui/styles'

import './styles/ColorBox.scss'


const styles = {
    colorBoxName: {
        fontSize: "12px",
        position: "absolute",
        bottom: "0",
        padding: "5px",
        color: props => chroma(props.color).luminance() <= 0.07 ? "lightText" : "DarkText"
    }

}
 class ColorBox extends Component {

    constructor(props){
        super(props);

        this.getClass = this.getClass.bind(this)
        this.changeCopyState = this.changeCopyState.bind(this)
        this.state = {
            copied: false
        }
    }
getClass(){
   const classOverlay = this.state.copied ? 'copy-overlay show' : 'copy-overlay'
    return classOverlay
}
changeCopyState(){
    this.setState({copied: true}, 
        () => setTimeout(() => this.setState({copied:false}), 1500))
}
    

    render() {
        

        const {name, color, moreUrl, showLink, classes} = this.props;
        const {copied} = this.state;

    const isDarker = chroma(color).luminance() <= 0.07;
        return (
            <CopyToClipboard text={color} onCopy={this.changeCopyState}>
            <div style={{background: color}} className='colorBox'>
                <div style={{background: color}} className={`copy-overlay ${copied && "show"}`}/>
                <div className={`copy-Msg ${copied && "show"}`} >
                    <h1>copied</h1>
                    <span>{color}</span>
                </div>
                <span className={classes.colorBoxName }>{name}</span>
                <button className={`copy-button ${ isDarker ? "isLight" : ""}`}>Copy</button>
                {showLink && 
                <Link to={moreUrl} onClick={(e) => e.stopPropagation()}>
                    <span className={`colorBox-more ${ isDarker ? "isLight" : ""}`}>More</span>
                </Link>
                }
            </div>
            </CopyToClipboard>
        )
    }
}


export default withStyles(styles)(ColorBox);