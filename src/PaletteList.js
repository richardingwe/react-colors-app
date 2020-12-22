import React, { Component } from 'react';
import { Link } from "react-router-dom";

export default class PalleteList extends Component {
    render() {
        const { palettes } = this.props;
        return (
            <div>
                <h1>React Colors</h1>
                {palettes.map(palette => (
                    <div>
                        <h1>{palette.paletteName}</h1>
                        <Link to={`/palette/${palette.id}`} >see more</Link>
                    </div>
                ))
                }
            </div>
        );
    }
}
