import React, {useState, useEffect} from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import Button from '@material-ui/core/Button';

import {withRouter, Link} from 'react-router-dom'
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import { ChromePicker } from 'react-color';
import DraggableColorList from './DraggableColorList'
import arrayMove from 'array-move';



const drawerWidth = 350;


const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),

    flexDirection: "row",
    justifyContent: "space-between",
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    flexGrow: 1,
    height: "calc(100vh - 64px)",
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },

  navBtns: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    
    "& form": {
      display: "flex",
      justifyContent: "space-between",

      "& button": {
        marginLeft: '20px',
      }
    }


  }
  
}));


NewPaletteForm.defaultProps = {
  maxColors : 20
}

function NewPaletteForm(props) {
  


  const classes = useStyles();
  // const theme = useTheme();
  const [open, setOpen] = useState(true);
  const [color, setColor] = useState("#3C77C5");
  // const [colors, setColors] = useState([{color:"red", name:"red"}, {color:"green", name:"green"}]);
  const [colors, setColors] = useState(props.palettes[0].colors);
  const [newName, setNewName] = useState('')
  const [newPaletteName, setNewPaletteName] = useState('jhjhjh')

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleChangeColor = (newColor) => {
      setColor(newColor.hex)
  }

  const addNewColor = () => {
      const newColor = {
          color: color,
          name: newName
      }
      setColors([...colors, newColor]);
  }

  const handleChangeName = (e) =>{
    setNewName(e.target.value);
    console.log(newName);
  }

  const handleChangePalletName = (e) => {
    setNewPaletteName(e.target.value)
  }

  const savePalette = () => {
    // let newName = "new test palette"; 
    const newPalette = {
      paletteName: newPaletteName,
      colors: colors,
      id: newPaletteName.toLowerCase().replace(/ /g, "-"),
      emoji: "🇮🇳",
    }
    console.log(newPalette)

    props.savePalette(newPalette);

    props.history.push("/")

  }

  // const checkIfUniquePaletteName = (newPaletteName) => {
  //   const palettes = props.palettes;
  //   let resulte = palettes.map( elm => elm.paletteName === newPaletteName);

  //   if(resulte.include('true')) return false
  // }
  
useEffect(() => {
    ValidatorForm.addValidationRule('isPaletteNameUnique', (value) => {
        
          // let resulte = props.palettes.map( elm => elm.paletteName.toLowerCase() === value.toLowerCase());
          // return !resulte.includes(true)
          return props.palettes.every( ({paletteName}) => paletteName.toLowerCase() !== value.toLowerCase() )
        
    });
  }, [props.palettes, newPaletteName]);

useEffect(() => {
    ValidatorForm.addValidationRule('isColorNameUnique', (value) => {
        return colors.every( cl => cl.name.toLowerCase() !== value.toLowerCase() )
    });
  }, [colors]);
useEffect(() => {
    ValidatorForm.addValidationRule('isColorUnique', (value) => {
        return colors.every( cl => cl.color !== color )
    });
  }, [color, colors]);


const deletBox = (name) => {
    const colorFiltred = colors.filter(elm => elm.name !== name);

    setColors(colorFiltred)
} 

const onSortEnd = ({oldIndex, newIndex}) => {
  let colorsListDragable = arrayMove(colors, oldIndex, newIndex)
  setColors(colorsListDragable)

}

const clearPalette = () => {
  setColors([])
}

const randomColors = () => {
  
  let allColors = props.palettes.map(el => el.colors).flat()
  let randomNumber = Math.floor(Math.random() * allColors.length)
  const randColor = allColors[randomNumber]
  setColors([...colors, randColor])

}

const paletteIsFull = colors.length >= props.maxColors;

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        color='default'
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, open && classes.hide)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            create new palette
          </Typography>
          
        </Toolbar>
        <div className={classes.navBtns}>
            <ValidatorForm 
              onSubmit={savePalette}>

              <TextValidator 
                  label="palette Name" 
                  name="newPalette"
                  type="text" 
                  value={newPaletteName} 
                  // validators={['required']}
                  // errorMessages={['this field is required']}
                  validators={['required','isPaletteNameUnique']}
                  errorMessages={['this field is required', 'palette name alraedy used']}
                  onChange={handleChangePalletName}/>
                  <Button type='submit' variant='contained' color='primary'>Save Palette</Button>
            </ValidatorForm>
            <Link to='/'>
              <Button variant='contained' color='secondary'>Go Back</Button>
            </Link>
        </div>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon /> 
          </IconButton>
        </div>
        <Divider/>
        <Typography variant="h4" >
            Design your palette
        </Typography>
        <div>
            <Button variant='contained' color='primary' onClick={clearPalette}> clear palette</Button>
            <Button variant='contained' color='secondary' disabled={paletteIsFull} onClick={randomColors}>
            { paletteIsFull ? "palette is full" : "Random Color"}</Button> 
        </div>
        <ChromePicker color={color} onChangeComplete={handleChangeColor} />
        <ValidatorForm 
            onSubmit={addNewColor}>

            <TextValidator 
                label="color Name" 
                name="color Name"
                type="text" 
                value={newName} 
                validators={['required','isColorUnique','isColorNameUnique']}
                errorMessages={['this field is required','color alraedy used', 'color name muste be unique']}
                onChange={handleChangeName}/>
              <Button variant='contained' color='primary' type='submit' disabled={paletteIsFull}  style={{backgroundColor: color}}> 
              { paletteIsFull ? "palette is full" : "ADD COLOR"}
              </Button>
        </ValidatorForm>
        

      </Drawer>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      >
        <div className={classes.drawerHeader} />
        {
            
            <DraggableColorList onSortEnd={onSortEnd} axis="xy" colors={colors} deletBox={(name) => deletBox(name)} />
        }
      </main>
    </div>
  );
}

export default withRouter(NewPaletteForm);
