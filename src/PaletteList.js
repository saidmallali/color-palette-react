import React, { Component } from 'react'
import { withRouter, Link } from 'react-router-dom'
import { withStyles } from '@material-ui/styles';
import styles from './styles/paletteListStyle'

import MiniPalette from './MiniPalette';


 class PaletteList extends Component {
    constructor(props){
        super(props);

        this.goToPalette = this.goToPalette.bind(this);
    }

    goToPalette(id) {
        this.props.history.push(`/palette/${id}`)
    }


    render() {
        


        const { palettes, classes } = this.props;
        return (
            <div className={classes.root}>
                <div className={classes.container}>
                    <nav className={classes.nav}>
                        <h1>React Colors</h1>
                        <Link to='/palette/new'>creat new palette</Link>
                    </nav>
                    <div className={classes.palette}>
                        {
                            palettes.map(palette => (
                                    <MiniPalette key={palette.id} handleClick={() => this.goToPalette(palette.id)} {...palette}/>

                            ))
                        }
                    </div>

                </div>
                
                
            </div>
        )
    }
}

export default withRouter(withStyles(styles)(PaletteList));