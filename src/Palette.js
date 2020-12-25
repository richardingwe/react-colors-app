import React, { Component } from 'react';
import ColorBox from "./ColorBox";
import "./Palette.css";
import NavBar from "./NavBar";

export default class Palette extends Component {
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
        const { level, format } = this.state;
        const colorBoxes = colors[level].map(color => (
            <ColorBox
                background={color[format]}
                name={color.name}
                key={color.id}
                id={color.id}
                paletteId={id}
                showLink={true}
            />
        ));
        return (
            <div>
                <div className="Palette">
                    <NavBar
                        level={level}
                        changeLevel={this.changeLevel}
                        handleChange={this.changeFormat}
                        showingAllColors={true}

                    />
                    {/* navbar goes here */}
                    <div className="Palette-colors">{colorBoxes}</div>
                    {/* footer goes here */}
                    <footer className="Palette-footer">
                        {paletteName}
                        <span className="emoji">
                            {emoji}
                        </span>
                    </footer>
                </div>
            </div>
        );
    }
}
