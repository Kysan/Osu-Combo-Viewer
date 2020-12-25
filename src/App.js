import React, { Component, useRef } from "react";
import { Graphics } from "pixi.js";
import { Stage, Sprite, PixiComponent } from "@inlet/react-pixi";

import GameNote from "./components/GameNote";
import MapToApp from "./Utils/MapParser";

class App extends Component {
  state = {
    position: { x: 0, y: 0 },
    fileData: "",
    currentCombo: 0,
    map: [
      [
        { x: 150, y: 150 },
        { x: 450, y: 450 },
        { x: 600, y: 600 },
      ],
    ],
  };

  componentDidMount() {
    document.addEventListener("keydown", this.handleKeyDown);
  }

  handleKeyDown = ({ code }) => {
    let { currentCombo, map } = this.state;
    if (
      (code == "KeyD" || code == "ArrowRight") &&
      currentCombo !== map.length - 1
    ) {
      this.setState({ currentCombo: currentCombo + 1 });
    }
    if ((code == "KeyA" || code == "ArrowLeft") && currentCombo !== 0) {
      this.setState({ currentCombo: currentCombo - 1 });
    }
  };

  handleFileLoad = ({ target: fileSelector }) => {
    let file = fileSelector.files[0];
    let reader = new FileReader();

    reader.readAsText(file);

    reader.onload = () => {
      console.log(MapToApp(reader.result));
      this.setState({ map: MapToApp(reader.result) });
    };

    reader.onerror = function () {
      alert(reader.error);
    };
  };

  render() {
    let { x, y } = this.state.position;
    let { width, height } = window.screen;

    width = width * (80 / 100);
    // * à partir de la on veux du 4/3

    height = (3 / 4) * width;

    let { map, currentCombo } = this.state;

    return (
      <div id="game">
        <div id="menu">
          <h1 className="title"> Osu Combo Visualizer</h1>
          <div className="toolbar">
            <span>Choisez une map</span>
            <input type="file" onChange={this.handleFileLoad} title="Ouvrir" />
          </div>
        </div>

        <Stage width={width} height={height}>
          {map[currentCombo].reverse().map((note, number) => {
            let { x, y } = note; // je pouvais faire {...note} (je sais)
            //  x (Integer) va de 0 à 512 (inclusif) et y (Integer) va de 0 à 384 (inclusif).
            x = x * (width / 512) - 100;
            y = y * (height / 384) - 100;

            return (
              <GameNote
                x={x}
                y={y}
                radius={100}
                key={number}
                text={number + 1}
              />
            );
          })}
        </Stage>
        <div id="debug">{this.state.fileData}</div>
      </div>
    );
  }
}

export default App;
