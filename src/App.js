import React from 'react';
import Palette from './Palette';
import {Switch, Route} from 'react-router-dom'

import PaletteList from './PaletteList'
import seedColors from './seedColors.js'
import SingleColorPalette from './SingleColorPalette'
import { generatePalette } from './colorHelpers';

import './App.css';

class App extends React.Component {

  findPalette(id){
    return seedColors.find(function(palette){
      return palette.id === id;
    })
  }

  render(){

    return (
      <Switch>
          <Route exact path='/' render={() => <PaletteList palettes={seedColors}/>} />
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
