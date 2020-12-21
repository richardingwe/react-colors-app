import React, { Component } from 'react';
import ColorBox from "./ColorBox";
import Slider from "rc-slider";
import "./Palette.css";
import "rc-slider/assets/index.css";


export default class Palette extends Component {
    constructor(props) {
        super(props)
        this.state = {
            level: 500
        }
    }
    changeLevel = (level) => {
        this.setState({
            level
        })
    }
    render() {
        const { colors } = this.props.palette;
        const { level } = this.state;
        const colorBoxes = colors[level].map(color => (
            <ColorBox background={color.hex} name={color.name} />
        ));
        return (
            <div>
                <div className="Palette">
                    <div className="slider">
                        <Slider defaultValue={level} min={100} max={900} step={100} onAfterChange={this.changeLevel} />
                    </div>
                    {/* navbar goes here */}
                    <div className="Palette-colors">{colorBoxes}</div>
                    {/* footer goes here */}
                </div>
            </div>
        )
    }
}
