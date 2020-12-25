import React, { Component } from 'react';
import "./ColorBox.css";
import { Link } from "react-router-dom";
import { CopyToClipboard } from "react-copy-to-clipboard";
import chroma from "chroma-js";



export default class ColorBox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            copied: false
        };

    }
    changeCopyState = () => {
        this.setState({ copied: true }, () => {
            setTimeout(() => {
                this.setState({ copied: false });
            }, 1500);
        });
    };
    render() {
        const { background, name, paletteId, id, showLink } = this.props;
        const { copied } = this.state;
        const isDarkColor = chroma(background).luminance() <= 0.08;
        const isLightColor = chroma(background).luminance() >= 0.5;
        return (
            <CopyToClipboard text={background} onCopy={this.changeCopyState}>
                <div style={{ background }} className="ColorBox">
                    <div style={{ background }} className={`copy-overlay ${copied ? "show" : ""}`} />
                    <div className={`copy-message ${copied ? "show" : ""}`}>
                        <h1 className={isLightColor ? "dark-text" : ""}>copied!</h1>
                        <p className={isLightColor ? "dark-text" : ""}>{background}</p>
                    </div>
                    <div className="copy-container">
                        <div className="box-content">
                            <span className={isDarkColor ? "light-text" : ""}>{name}</span>
                        </div>
                        <button className={`copy-button ${isLightColor ? "dark-text" : ""}`}>Copy</button>
                    </div>
                    {showLink &&
                        <Link to={`/palette/${paletteId}/${id}`} onClick={e => e.stopPropagation()}>
                            <span className={`see-more ${isLightColor ? "dark-text" : ""}`}>MORE</span>
                        </Link>
                    }
                </div>
            </CopyToClipboard>
        );
    }
}

