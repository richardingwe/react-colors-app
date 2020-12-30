import React, { useState, useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import Palette from './Palette';
import PaletteList from "./PaletteList";
import SingleColorPalette from "./SingleColorPalette";
import seedColors from './seedColors';
import NewPaletteForm from "./NewPaletteForm";
import { generatePalette } from './colorHelpers';
import './App.css';

function App() {
  const savedPalettes = JSON.parse(window.localStorage.getItem("palettes"));
  const [palettes, setPalettes] = useState(savedPalettes || seedColors);

  const findPalette = (id) => {
    console.log(palettes);
    return palettes.find(palette => palette.id === id
    );
  };

  const savePalette = (newPalette) => {
    setPalettes([...palettes, newPalette]);
  };

  useEffect(() => {
    syncLocalStorage();
  }, [palettes]);

  const syncLocalStorage = () => {
    window.localStorage.setItem("palettes", JSON.stringify(palettes));
  };

  return (
    <Switch>
      <Route
        exact
        path="/palette/new"
        render={(routeProps) => <NewPaletteForm
          savePalette={savePalette}
          palettes={palettes}
          {...routeProps} />}
      />
      <Route
        exact
        path="/palette/:paletteId/:colorId"
        render={(routeProps) =>
          <SingleColorPalette
            colorId={routeProps.match.params.colorId}
            palette={generatePalette(findPalette(routeProps.match.params.paletteId))} />} />
      <Route
        exact
        path="/"
        render={(routeProps) => (
          <PaletteList palettes={palettes} {...routeProps} />
        )}
      />
      <Route
        exact
        path="/palette/:id"
        render={(routeProps) => (
          <Palette
            palette={generatePalette(findPalette(routeProps.match.params.id)
            )}
          />
        )}
      />
    </Switch>
    // <div className="App">
    //   <Palette palette={generatePalette(seedColors[4])} />
    // </div>
  );
}

export default App;
