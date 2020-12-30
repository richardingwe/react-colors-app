import React, { useState } from 'react';
import { Link } from "react-router-dom";
import clsx from 'clsx';
import PaletteMetaForm from "./PaletteMetaForm";
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import AddToPhotosicon from '@material-ui/icons/AddToPhotos';
import useStyles from "./styles/PaletteFormNavStyles";


export default function PaletteFormNav(props) {
    const classes = useStyles();
    const [formShowing, setFormShowing] = useState(false);
    const { open, handleDrawerOpen, palettes, handleSubmit } = props;

    const showForm = () => {
        setFormShowing(true);
    };
    const hideForm = () => {
        setFormShowing(false);
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
                        <AddToPhotosicon />
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
                hideForm={hideForm}
            />
            }
        </div>
    );
}