import React, { Component } from 'react';
import ColorBox from "./ColorBox";
import NavBar from "./NavBar";
import PaletteFooter from "./PaletteFooter";

class SingleColorPalette extends Component {
    constructor(props) {
        super(props);
        this._shades = this.gatherShades(this.props.palette, this.props.colorId);
        this.state = {
            format: "hex"
        };
    }
    gatherShades = (palette, colorToFilterBy) => {
        let shades = [];
        let allColors = palette.colors;

        for (let key in allColors) {
            shades = shades.concat(
                allColors[key].filter(color => color.id === colorToFilterBy)
            );
        }

        // return all shades of given color except the first one
        return shades.slice(1);
    };
    changeFormat = (val) => {
        this.setState({
            format: val
        });
    };
    render() {
        const { format } = this.state;
        const { paletteName, emoji } = this.props.palette;
        const colorBoxes = this._shades.map(color =>
            <ColorBox
                key={color.id}
                name={color.name}
                background={color[format]}
                showLink={false}
            />
        );
        return (
            <div className="palette">
                <NavBar
                    handleChange={this.changeFormat}
                    showingAllColors={false}
                />
                <div className="Palette-colors">
                    {colorBoxes}
                </div>
                <PaletteFooter
                    paletteName={paletteName}
                    emoji={emoji}
                />
            </div>
        );
    }
}

export default SingleColorPalette;