import React, { Component } from 'react'
import {Link } from 'react-router-dom'
import Slider from 'rc-slider';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Snackbar from '@material-ui/core/Snackbar';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';

import 'rc-slider/assets/index.css';
import './styles/NavBar.scss'


export default class NavBar extends Component {
    constructor(props){
        super(props);

        this.handelFormatChange = this.handelFormatChange.bind(this)

        this.state ={
            format: "hex",
            open:false
        }
    }

    handelFormatChange(e){
        this.setState({
            format: e.target.value,
            open: true
        }, this.props.handelChange(e.target.value))

    }
    handleClick = () => {
        this.setState({
            open: true
        })
      };
   handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            this.setState({
                open: false
            })
        }
    
        this.setState({
            open: false
        })
      };

    render() {
        const {level, changelevelPalette, showingAllCollers } = this.props
        return (
            <div className='navbar'>
                <div className="navbar-logo">
                    {/* <a href='/'>color react</a> */}
                    <Link to='/'>color react</Link>
                </div>
                {showingAllCollers && <p>level: {level}</p>}
                {showingAllCollers && <div className="slider">
                    <Slider 
                        defaultValue={level}
                        min={100}
                        max={900}
                        step={100}
                        onAfterChange={changelevelPalette}/>
                </div>
                }
                <div className='select-container'>
                    <Select value={this.state.format} onChange={this.handelFormatChange}>
                        
                        <MenuItem data="sss" value='hex'>HEX - #ffffff</MenuItem>
                        <MenuItem value='rgb'>RGB - rgb(255, 255, 255)</MenuItem>
                        <MenuItem value='rgba'>RGBA - rgba(255, 255, 255, 1.0)</MenuItem>
                    </Select>
                </div>
                <Snackbar
                    anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                    }}
                    open={this.state.open}
                    autoHideDuration={3000}
                    onClose={this.handleClose}
                    ContentProps={{
                    'aria-describedby': 'message-id',
                    }}
                    message={<span id="message-id">Format Changed to: {this.state.format}</span>}
                    action={[
                    <IconButton
                        key="close"
                        aria-label="close"
                        color="inherit"
                        // className={classes.close}
                        onClick={this.handleClose}
                    >
                        <CloseIcon />
                    </IconButton>,
                    ]}
                />
            </div>
        )
    }
}
