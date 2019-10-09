import React, { Component } from 'react'
import ColorBox from './ColorBox'
import NavBar from './NavBar'
import PaletteFooter from './paletteFooter'


 class SingleColorPalette extends Component {
    constructor(props){
        super(props);

        this.changeFormat = this.changeFormat.bind(this);
        this.handleGoBack = this.handleGoBack.bind(this)

        this._shades = this.gatherShades(this.props.palette, this.props.colorId);
        console.log(this._shades);

        this.state ={
            format: 'hex'
        }
    }

    gatherShades(palette, colorToFilterBy){
        let shades =[];
        let allColors = palette.colors;

        for (let key in allColors){
            shades = shades.concat(
                allColors[key].filter(color => color.id === colorToFilterBy)
            )
        }

        return shades.slice(1);
    }

    changeFormat(value){
        this.setState({
            format: value
        })
    }

handleGoBack(){
    this.props.history.goBack();
}
    render() {
        const {paletteName, emoji} = this.props.palette;
        const {format } = this.state;
        const colorsShade = this._shades.map(color => <ColorBox  key={color.name} name={color.name} color={color[format]} showLink={false}/>)
        return (
            <div className='singleColorPalette palette'>
                <NavBar   handelChange={this.changeFormat} showingAllCollers={false} />
                <div className='palette-colors'>
                    {
                        colorsShade
                    }
                    <div className='goBack colorBox' onClick={this.handleGoBack}><span>go back</span></div>
                </div>
                
                <PaletteFooter paletteName={paletteName} emoji={emoji}  />
            </div>
        )
    }
}

export default SingleColorPalette;