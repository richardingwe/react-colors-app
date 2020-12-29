import React, { Component } from 'react';
import { Link } from "react-router-dom";
import clsx from 'clsx';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import MenuIcon from '@material-ui/icons/Menu';
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";


class PaletteFormNav extends Component {
    constructor(props) {
        super(props);
        this.state = {
            newPaletteName: ""
        };
    }
    componentDidMount() {
        ValidatorForm.addValidationRule("isPaletteNameUnique", (value) =>
            this.props.palettes.every(({ paletteName }) =>
                paletteName.toLowerCase() !== value.toLowerCase()));
    }
    handleChangePaletteName = (evt) => {
        this.setState({
            [evt.target.name]: evt.target.value
        });
    };
    render() {
        const { classes, open, handleDrawerOpen } = this.props;
        const { newPaletteName } = this.state;
        return (
            <div>
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
                        <ValidatorForm onSubmit={() => this.props.handleSubmit(newPaletteName)}>
                            <TextValidator
                                onChange={this.handleChangePaletteName}
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
                            <Link to="/">
                                <Button
                                    variant="contained"
                                    color="secondary"
                                >Go Back</Button>
                            </Link>
                        </ValidatorForm>
                    </Toolbar>
                </AppBar>
            </div>
        );
    }
}
export default PaletteFormNav;