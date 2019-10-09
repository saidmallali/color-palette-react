import React, { Component } from 'react';
import ColorBox from './ColorBox'
import NavBar from './NavBar'
import PaletteFooter from './paletteFooter'


import './styles/Palette.scss'


class Palette extends Component {
    constructor(){
        super();

        this.changeLevel = this.changeLevel.bind(this)
        this.changeFormat = this.changeFormat.bind(this)
        this.state ={
            level: 500,
            format:"hex"
        }
    }

    changeLevel(level){
        this.setState({
            level
        })
    }
    changeFormat(value){
        this.setState({
            format: value
        })
    }

    render() {
        const { colors,paletteName, emoji, id } = this.props.palette;
        const {level, format} = this.state
        const colorBoxs = colors[level].map(color => <ColorBox 
                                                                key={color.name} 
                                                                name={color.name} 
                                                                color={color[format]} 
                                                                showLink={true}
                                                                moreUrl={`/palette/${id}/${color.id}`}/> );

        return (
            <div className='palette'>
                <NavBar level={level}  handelChange={this.changeFormat} changelevelPalette={this.changeLevel} showingAllCollers={true}/>
                <div className='palette-colors'>
                    {colorBoxs}
                </div>
                <PaletteFooter paletteName={paletteName} emoji={emoji}  />
            </div>
        )
    }
}


export default  Palette;
