import React from 'react';
import Palette from './Palette';
import {Switch, Route} from 'react-router-dom'

import PaletteList from './PaletteList'
import seedColors from './seedColors.js'
import SingleColorPalette from './SingleColorPalette'
import { generatePalette } from './colorHelpers';
import NewPaletteForm from './NewPaletteForm';

import './App.css';

class App extends React.Component {
  constructor(props){
    super(props);

    this.savePalette = this.savePalette.bind(this)
    this.findPalette = this.findPalette.bind(this)

    this.state = {
      palettes: seedColors
    }
  }


  findPalette(id){
    return this.state.palettes.find(function(palette){
      return palette.id === id;
    })
  }

  savePalette(newPalette){

    this.setState({
      palettes: [...this.state.palettes, newPalette]

    })
  }
  render(){

    return (
      <Switch>
          <Route exact path='/palette/new' render={(...routerProps) => <NewPaletteForm routerProps={routerProps} palettes={this.state.palettes} savePalette={this.savePalette} />}/>
          <Route exact path='/' render={() => <PaletteList palettes={this.state.palettes}/>} />
          <Route exact path='/palette/:id' render={(routerProps) => <Palette palette={generatePalette(this.findPalette(routerProps.match.params.id))}/>}  />
          <Route
            exact 
            path='/palette/:paletteId/:colorId'
            render={(routerProps) => <SingleColorPalette {...routerProps} colorId={routerProps.match.params.colorId} palette={generatePalette(this.findPalette(routerProps.match.params.paletteId))}  />}
          />
      </Switch>
      // <div className="App">
      //   <Palette palette={generatePalette(seedColors[4])} />
      // </div>
    );
  }
}

export default App;
