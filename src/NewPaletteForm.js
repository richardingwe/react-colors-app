import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
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
import DraggableColorBox from "./DraggableColorBox";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import { ChromePicker } from 'react-color';


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
    const [open, setOpen] = useState(false);
    const [newColorName, setNewColorName] = useState("");
    const [currentColor, setCurrentColor] = useState("teal");
    const [colors, setColors] = useState([]);
    const [newPaletteName, setNewPaletteName] = useState("");

    useEffect(() => {
        ValidatorForm.addValidationRule("isColorNameUnique", (value) =>
            colors.every(({ name }) =>
                name.toLowerCase() !== value.toLowerCase()));
        ValidatorForm.addValidationRule("isColorUnique", (value) =>
            colors.every(({ color }) =>
                color !== currentColor));
        ValidatorForm.addValidationRule("isPaletteNameUnique", (value) =>
            props.palettes.every(({ paletteName }) =>
                paletteName.toLowerCase() !== value.toLowerCase()));
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

    const handleChangeColor = (evt) => {
        setNewColorName(evt.target.value);
    };

    const handleChangePaletteName = (evt) => {
        setNewPaletteName(evt.target.value);
    };

    const handleSubmit = () => {
        let newName = newPaletteName;
        const newPalette = {
            paletteName: newName,
            id: newName.toLowerCase().replace(/ /g, "-"),
            colors
        };
        props.savePalette(newPalette);
        props.history.push("/");
    };

    return (
        <div className={classes.root}>
            <CssBaseline />
            <AppBar
                position="fixed"
                color="default"
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
                        Persistent drawer
                    </Typography>
                    <ValidatorForm onSubmit={handleSubmit}>
                        <TextValidator
                            onChange={handleChangePaletteName}
                            label="Palette Name"
                            name="newPaletteName"
                            value={newPaletteName}
                            validators={["required", "isPaletteNameUnique"]}
                            errorMessages={["Enter Palette Name", "Name Already Taken"]}
                        />
                        <Button
                            variant="contained"
                            type="submit"
                            color="primary">
                            Save Palette
                    </Button>
                    </ValidatorForm>
                </Toolbar>
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
                        {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                    </IconButton>
                </div>
                <Divider />
                <Typography
                    variant="h6">
                    Design Your Palette
                    </Typography>
                <div>
                    <Button variant="contained" color="secondary">Clear Palette</Button>
                    <Button variant="contained" color="primary">Random Color</Button>
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
                        errorMessages={["this field is required", "color name must be unique", "color already used"]}
                    />
                    <Button type="submit" variant="contained" color="primary" style={{ backgroundColor: currentColor }} >Add Color</Button>
                </ValidatorForm>
            </Drawer>
            <main
                className={clsx(classes.content, {
                    [classes.contentShift]: open,
                })}
            >
                <div className={classes.drawerHeader} />
                {colors.map(color => (
                    <DraggableColorBox color={color.color} name={color.name} />
                ))}
            </main>
        </div>
    );
}