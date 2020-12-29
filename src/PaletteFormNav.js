import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import MenuIcon from '@material-ui/icons/Menu';
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";


const drawerWidth = 400;

const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex"
    },
    appBar: {
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        flexDirection: "row",
        justifyContent: "space-between",
        height: "64px"
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
    navBtns: {

    }
}));

export default function PaletteFormNav(props) {
    const classes = useStyles();
    const [newPaletteName, setNewPaletteName] = useState("");

    useEffect(() => {
        ValidatorForm.addValidationRule("isPaletteNameUnique", (value) =>
            props.palettes.every(({ paletteName }) =>
                paletteName.toLowerCase() !== value.toLowerCase()));
    });

    const handleChangePaletteName = (evt) => {
        setNewPaletteName(evt.target.value);
    };

    const { open, handleDrawerOpen } = props;
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
                        Create A Palette
                    </Typography>
                </Toolbar>
                <div className={classes.navBtns}>
                    <ValidatorForm onSubmit={() => props.handleSubmit(newPaletteName)}>
                        <TextValidator
                            onChange={handleChangePaletteName}
                            label="Palette Name"
                            name="newPaletteName"
                            value={newPaletteName}
                            validators={["required", "isPaletteNameUnique"]}
                            errorMessages={[
                                "Enter Palette Name",
                                "Name Already Taken"]}
                        />
                        <Button
                            variant="contained"
                            type="submit"
                            color="primary"
                        >
                            Save Palette
                            </Button>
                    </ValidatorForm>
                    <Link to="/">
                        <Button
                            variant="contained"
                            color="secondary"
                        >Go Back</Button>
                    </Link>
                </div>
            </AppBar>
        </div>
    );
}