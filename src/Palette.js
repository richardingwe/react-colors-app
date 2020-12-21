import React, { Component } from 'react';
import ColorBox from "./ColorBox";
import "./Palette.css"
export default class Palette extends Component {
    render() {
        const colorBoxes = this.props.colors.map(color => (
            <ColorBox background={color.color} name={color.name} />
        ));
        return (
            <div>
                <div className="Palette">
                    {/* navbar goes here */}
                    <div className="Palette-colors">{colorBoxes}</div>
                    {/* footer goes here */}
                </div>
            </div>
        )
    }
}
