import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import clsx from 'clsx';
import PaletteFormNav from "./PaletteFormNav";
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import Toolbar from '@material-ui/core/Toolbar';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import DraggableColorList from "./DraggableColorList";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import { ChromePicker } from 'react-color';
import arrayMove from "array-move";


const drawerWidth = 400;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    appBar: {
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
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
        // necessary for content to be below app bar
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
}));


export default function NewPaletteForm(props) {
    const classes = useStyles();
    const theme = useTheme();
    const [open, setOpen] = useState(true);
    const [newColorName, setNewColorName] = useState("");
    const [currentColor, setCurrentColor] = useState("teal");
    const [colors, setColors] = useState(props.palettes[0].colors);
    // const [newPaletteName, setNewPaletteName] = useState("");
    const { maxColors } = props;
    const paletteFull = colors.length >= maxColors;

    useEffect(() => {
        ValidatorForm.addValidationRule("isColorNameUnique", (value) =>
            colors.every(({ name }) =>
                name.toLowerCase() !== value.toLowerCase()));
        ValidatorForm.addValidationRule("isColorUnique", (value) =>
            colors.every(({ color }) =>
                color !== currentColor));

    });

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const updateCurrentColor = (newColor) => {
        setCurrentColor(newColor.hex);
    };

    const addNewColor = () => {
        const newColor = { color: currentColor, name: newColorName };
        setColors([...colors, newColor]);
        setNewColorName("");
    };

    const clearColors = () => {
        setColors([]);
    };

    const handleChangeColor = (evt) => {
        setNewColorName(evt.target.value);
    };

    const handleSubmit = (newPaletteName) => {
        const newPalette = {
            paletteName: newPaletteName,
            id: newPaletteName.toLowerCase().replace(/ /g, "-"),
            colors
        };
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
                <Typography
                    variant="h6">
                    Design Your Palette
                    </Typography>
                <div>
                    <Button
                        variant="contained"
                        color="secondary"
                        onClick={clearColors}
                    >
                        Clear Palette
                    </Button>
                    <Button
                        variant="contained"
                        disabled={paletteFull}
                        color="primary"
                        onClick={addRandomColor}
                    >
                        Random Color
                    </Button>
                </div>
                <ChromePicker
                    color={currentColor}
                    onChangeComplete={updateCurrentColor}
                />
                <ValidatorForm onSubmit={addNewColor}>
                    <TextValidator
                        value={newColorName}
                        name="newColorName"
                        onChange={handleChangeColor}
                        validators={["required", "isColorNameUnique", "isColorUnique"]}
                        errorMessages={[
                            "Enter a color name",
                            "color name must be unique",
                            "color already used"]}
                    />
                    <Button
                        type="submit"
                        variant="contained"
                        disabled={paletteFull}
                        color="primary"
                        style={{ backgroundColor: paletteFull ? "grey" : currentColor }}
                    >
                        {paletteFull ? "Palette full" : "Add Color"}
                    </Button>
                </ValidatorForm>
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
                />
            </main>
        </div>
    );
}
NewPaletteForm.defaultProps = {
    maxColors: 20
};