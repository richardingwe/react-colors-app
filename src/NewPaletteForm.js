import React, { useState } from 'react';
import clsx from 'clsx';
import PaletteFormNav from "./PaletteFormNav";
import ColorPickerForm from "./ColorPickerForm";
import { useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import DraggableColorList from "./DraggableColorList";
import arrayMove from "array-move";
import seedColors from "./seedColors";
import useStyles from "./styles/NewPaletteFormStyles";



export default function NewPaletteForm(props) {
    const classes = useStyles();
    const theme = useTheme();
    const [open, setOpen] = useState(true);
    const [colors, setColors] = useState(seedColors[0].colors);
    const { maxColors } = props;
    const paletteFull = colors.length >= maxColors;

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };


    const addNewColor = (newColor) => {
        setColors([...colors, newColor]);
    };

    const clearColors = () => {
        setColors([]);
    };

    const handleSubmit = (newPalette) => {
        newPalette.id = newPalette.paletteName.toLowerCase().replace(/ /g, "-");
        newPalette.colors = colors;
        props.savePalette(newPalette);
        props.history.push("/");
    };

    const removeColor = (colorName) => {
        setColors(colors.filter(color => color.name !== colorName));
    };

    const onSortEnd = ({ oldIndex, newIndex }) => {
        setColors(() => (
            arrayMove(colors, oldIndex, newIndex)
        ));
    };

    const addRandomColor = () => {
        const allColors = props.palettes.map(p => p.colors).flat();
        let rand = Math.floor(Math.random() * allColors.length);
        const randomColor = allColors[rand];
        setColors([...colors, randomColor]);
    };

    return (
        <div className={classes.root}>
            <PaletteFormNav
                open={open}
                classes={classes}
                palettes={props.palettes}
                handleSubmit={handleSubmit}
                handleDrawerOpen={handleDrawerOpen}
            />
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
                        {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                    </IconButton>
                </div>
                <Divider />
                <div className={classes.container}>
                    <Typography
                        variant="h4"
                        gutterBottom
                    >
                        Design Your Palette
                    </Typography>
                    <div className={classes.buttons}>
                        <Button
                            variant="contained"
                            color="secondary"
                            className={classes.button}
                            onClick={clearColors}
                        >
                            Clear Palette
                        </Button>
                        <Button
                            variant="contained"
                            disabled={paletteFull}
                            className={classes.button}
                            color="primary"
                            onClick={addRandomColor}
                        >
                            Random Color
                    </Button>
                    </div>
                    <ColorPickerForm
                        paletteFull={paletteFull}
                        addNewColor={addNewColor}
                        colors={colors}
                    />
                </div>
            </Drawer>
            <main
                className={clsx(classes.content, {
                    [classes.contentShift]: open,
                })}
            >
                <div className={classes.drawerHeader} />
                <DraggableColorList
                    colors={colors}
                    removeColor={removeColor}
                    axis="xy"
                    onSortEnd={onSortEnd}
                    distance={20}
                />
            </main>
        </div>
    );
}
NewPaletteForm.defaultProps = {
    maxColors: 20
};