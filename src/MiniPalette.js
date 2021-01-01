import React from 'react';
import styles from "./styles/MiniPaletteStyles";
import { withStyles } from "@material-ui/styles";
import DeleteIcon from "@material-ui/icons/Delete";

function MiniPalette(props) {
    const { classes, paletteName, emoji, colors } = props;
    const miniColorBoxes = colors.map(color => (
        <div
            className={classes.miniColor}
            style={{
                backgroundColor: color.color
            }}
            key={color.name}
        >
        </div>
    ));

    const deletePalette = (e) => {
        e.stopPropagation();
        props.openDialog(props.id);
    };
    return (
        <div className={classes.root} onClick={props.handleClick}>
            <DeleteIcon onClick={deletePalette} className={classes.deleteIcon} />
            <div className={classes.colors}>
                {/* mini color boxes */}
                {miniColorBoxes}
            </div>
            <h5 className={classes.title}>
                {paletteName} <span className={classes.emoji}>{emoji}</span></h5>
        </div>
    );
}

export default withStyles(styles)(MiniPalette);