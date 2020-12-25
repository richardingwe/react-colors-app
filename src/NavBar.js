import React, { Component } from 'react';
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import { Link } from "react-router-dom";
import CloseIcon from "@material-ui/icons/Close";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import "./NavBar.css";


export default class NavBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            format: "hex",
            open: false
        };
    }
    handleFormatChange = (e) => {
        this.setState({
            format: e.target.value,
            open: true
        });
        this.props.handleChange(e.target.value);
    };
    closeSnackbar = () => {
        this.setState({
            open: false
        });
    };
    render() {
        const { level, changeLevel, showingAllColors } = this.props;
        const { format } = this.state;
        return (
            <header className="NavBar">
                <div className="logo">
                    <Link to="/">reactcolorpicker</Link>
                </div>
                {showingAllColors &&
                    <div className="slider-container">
                        <span>Level: {level}</span>
                        <div className="slider">
                            <Slider
                                defaultValue={level}
                                min={100}
                                max={900}
                                step={100}
                                onAfterChange={changeLevel}
                            />
                        </div>
                    </div>
                }
                <div className="select-container">
                    <Select value={format} onChange={this.handleFormatChange} >
                        <MenuItem value="hex">HEX - #ffffff</MenuItem>
                        <MenuItem value="rgb">RGB - rgb(255, 255, 255)</MenuItem>
                        <MenuItem value="rgba">RGBA - rgb(255, 255, 255, 1.0)</MenuItem>
                    </Select>
                </div>
                <Snackbar
                    anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
                    open={this.state.open}
                    autoHideDuration={3000}
                    message={<span id="message-id">{`Format Changed To ${format.toUpperCase()}`}</span>}
                    ContentProps={{
                        "aria-describedby": "message-id"
                    }}
                    onClose={this.closeSnackbar}
                    action={[
                        <IconButton
                            onClick={this.closeSnackbar}
                            color="inherit"
                            key="close"
                            aria-label="close"
                        >
                            <CloseIcon />
                        </IconButton>
                    ]}
                />
            </header>
        );
    }
}
