import React from 'react'
import { withStyles } from '@material-ui/styles';
import DeleteIcon from '@material-ui/icons/Delete';
import { SortableElement } from "react-sortable-hoc"




const styles = {
    root: {
        position: "relative",
        width: "20%",
        height: "25%",
        margin: "0 auto",
        display: "inline-block",
        cursor: "pointer",
        marginBottom: "-3.5px",
        "&:hover svg": {
            color:'white',
            transform: "scale(1.3)"
           
        }
    },
    boxContent: {
        position: "absolute",
        width: "100%",
        left: "0px",
        bottom: "0px",
        padding: "10px",
        color: "black",
        letterSpacing: "1px",
        textTransform: "uppercase",
        fontSize: "12px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between"

        
    },

    deleteIcon:{
        transition: "all .3s ease"
    }

}


const  DraggableColorBox = SortableElement((props) => {

    const {classes} = props
    return (
        <div 
            className={classes.root}
            style={{backgroundColor: props.color}}>
                <div className={classes.boxContent}>
                    <span>{props.name}</span>
                    <DeleteIcon className={classes.deleteIcon} onClick={props.deletBox}/>
                </div>
            
        </div>
    )
})


export default withStyles(styles)(DraggableColorBox);