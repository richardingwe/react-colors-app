import React, { useState } from 'react';
import { Link } from "react-router-dom";
import clsx from 'clsx';
import PaletteMetaForm from "./PaletteMetaForm";
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import MenuIcon from '@material-ui/icons/Menu';


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
        alignItems: "center",
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
        marginRight: "1rem"
    },
    button: {
        margin: "0 0.5rem"
    },
    link: {
        textDecoration: "none"
    }
}));

export default function PaletteFormNav(props) {
    const classes = useStyles();
    const [formShowing, setFormShowing] = useState(false);
    const { open, handleDrawerOpen, palettes, handleSubmit } = props;

    const showForm = () => {
        setFormShowing(true);
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
                        Create A Palette
                    </Typography>
                </Toolbar>
                <div className={classes.navBtns}>
                    <Link to="/" className={classes.link}>
                        <Button
                            variant="contained"
                            color="secondary"
                            className={classes.button}
                        >Go Back</Button>
                    </Link>
                    <Button
                        variant="contained"
                        color="primary"
                        className={classes.button}
                        onClick={showForm}>
                        Save Palette
                    </Button>
                </div>
            </AppBar>
            {formShowing && <PaletteMetaForm
                palettes={palettes}
                handleSubmit={handleSubmit}
            />
            }
        </div>
    );
}