import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { withStyles } from '@material-ui/styles';

import MiniPalette from './MiniPalette';

const styles = {
    root: {
        height: "100vh",
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "center",
        /* background by SVGBackgrounds.com */
        backgroundColor: "#394bad",
        // backgroundImage: `url(${bg})`,
        overflow: "scroll"
    },
    conatiner: {
        width: "50%",
        display: "flex",
        alignItems: "flex-start",
        flexDirection: "column",
        flexWrap: "wrap",
    },
    nav: {
        display: "flex",
        width: "100%",
        justifyContent: "space-between",
        alignItems: "center",
        color: "white",
        "& a": {
        color: "white"
        }
    },
    palette: {
        boxSizing: "border-box",
        width: "100%",
        display: "grid",
        gridTemplateColumns: "repeat(3, 30%)",
        gridGap: "2.5rem",

    }
}


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