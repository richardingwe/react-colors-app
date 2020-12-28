import React from 'react';
import DeleteIcon from "@material-ui/icons/Delete";
import { withStyles } from "@material-ui/styles";


const styles = {
    root: {
        width: "20%",
        height: "25%",
        margin: "0 auto",
        display: "inline-block",
        position: "relative",
        cursor: "pointer",
        textTransform: "uppercase",
        marginBottom: "-3.5px",
        "&:hover svg": {
            color: "white",
            transform: "scale(1.2)"
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
        fontSize: "12px",
        display: "flex",
        alignContent: "center",
        justifyContent: "space-between"
    },
    deleteIcon: {
        transition: "all 0.3s ease-in-out"
    }
};

function DraggableColorBox(props) {
    const { classes, handleClick, name, color } = props;
    return (
        <div className={classes.root} style={{ backgroundColor: color }}>
            <div className={classes.boxContent}>
                <span>{name}</span>
                <DeleteIcon onClick={handleClick} className={classes.deleteIcon} />
            </div>
        </div>
    );
}

export default withStyles(styles)(DraggableColorBox);