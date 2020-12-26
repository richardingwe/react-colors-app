import React, { Component } from 'react';
import ColorBox from "./ColorBox";
import "./Palette.css";
import NavBar from "./NavBar";
import { withStyles } from "@material-ui/styles";


const styles = {
    Palette: {
        height: "100vh",
        display: "flex",
        flexDirection: "column"
    },
    colors: {
        height: "90vh"
    },
    paletteFooter: {
        height: "4vh",
        backgroundColor: "white",
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "center",
        fontWeight: "bold"
    },
    emoji: {
        fontSize: "1.5rem",
        marginRight: "1rem"
    }
};


class Palette extends Component {
    constructor(props) {
        super(props);
        this.state = {
            level: 500,
            format: "hex"
        };
    }
    changeLevel = (level) => {
        this.setState({
            level
        });
    };
    changeFormat = (val) => {
        this.setState({
            format: val
        });
    };
    render() {
        const { colors, paletteName, emoji, id } = this.props.palette;
        const { classes } = this.props;
        const { level, format } = this.state;
        const colorBoxes = colors[level].map(color => (
            <ColorBox
                background={color[format]}
                name={color.name}
                key={color.id}
                id={color.id}
                paletteId={id}
                showingFullPalette={true}
            />
        ));
        return (
            <div>
                <div className={classes.Palette}>
                    <NavBar
                        level={level}
                        changeLevel={this.changeLevel}
                        handleChange={this.changeFormat}
                        showingAllColors={true}

                    />
                    {/* navbar goes here */}
                    <div className={classes.colors}>{colorBoxes}</div>
                    {/* footer goes here */}
                    <footer className={classes.paletteFooter}>
                        {paletteName}
                        <span className={classes.emoji}>
                            {emoji}
                        </span>
                    </footer>
                </div>
            </div>
        );
    }
}

export default withStyles(styles)(Palette);