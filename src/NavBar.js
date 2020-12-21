import React, { Component } from 'react';
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import "./NavBar.css";


export default class NavBar extends Component {
    render() {
        const { level, changeLevel } = this.props;
        return (
            <header className="NavBar">
                <div className="logo">
                    <a href="#">reactcolorpicker</a>
                </div>
                <span>Level: {level}</span>
                <div className="slider-container">
                    <Slider defaultValue={level} min={100} max={900} step={100} onAfterChange={changeLevel} />
                </div>
            </header>
        )
    }
}
