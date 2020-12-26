import React, { Component } from 'react';
import ColorBox from "./ColorBox";
import NavBar from "./NavBar";
import PaletteFooter from "./PaletteFooter";
import styles from "./styles/PaletteStyles";
import { withStyles } from "@material-ui/styles";

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
                    <PaletteFooter paletteName={paletteName} emoji={emoji} />
                </div>
            </div>
        );
    }
}

export default withStyles(styles)(Palette);