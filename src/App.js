import React, { Component, useRef } from "react";
import { Graphics } from "pixi.js";
import { Stage, Sprite, PixiComponent } from "@inlet/react-pixi";

import GameNote from "./components/GameNote";
import MapToApp from "./Utils/MapParser";

// range(-10, 10, 1) <=>
const IQ = Array.from(Array(314).keys())
  .map((e) => -e)
  .reverse()
  .concat(Array.from(Array(314).keys()));

class App extends Component {
  state = {
    position: { x: 0, y: 0 },
    fileData: "",
    currentCombo: 0,
    map: [
      IQ.map((p, index) => {
        return {
          x: Math.cos(p / 100) * 100 + 200,
          y: Math.sin(p / 100) * 100 + 200,
          value: ++index,
        };
      }),
    ],
    mouse: {},
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
  handleMouse = (event) => {
    // console.log(event);
  };
  handleFileLoad = ({ target: fileSelector }) => {
    let file = fileSelector.files[0];
    let reader = new FileReader();

    reader.readAsText(file);

    reader.onload = () => {
      console.log(MapToApp(reader.result));
      this.setState({
        map: MapToApp(reader.result),
        fileData: reader.result.replace(" ", "<\br>"),
      });
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

    let circleSize = height / 10;

    let { map, currentCombo } = this.state;

    return (
      <div id="game">
        <div id="menu">
          <h1 className="title"> Osu Combo Visualizer</h1>
          <div className="toolbar">
            <span>Choisisez une map</span>
            <input
              type="file"
              onChange={this.handleFileLoad}
              title="Ouvrir"
              accept=".osu"
            />
            <span>
              Combo n°{currentCombo + 1}/{map.length}
            </span>
            <span>
              Utilisez les flèches gauche et droite pour naviguer entre les
              pages de combos ou alors (Q) et (D)
            </span>
          </div>
        </div>

        <Stage width={width} height={height} onPointerMove={this.handleMouse}>
          {map[currentCombo].reverse().map((note, number) => {
            let { x, y, type, value } = note; // je pouvais faire {...note} (je sais)
            //  x (Integer) va de 0 à 512 (inclusif) et y (Integer) va de 0 à 384 (inclusif).
            x = (x * width) / 512 - 100;
            y = (y * height) / 384 - 100;
            let text = value;
            if (type === "slider") {
              text += "(s)";
            } else if (type === "spiner") {
              text = "spiner";
            }
            return (
              <GameNote
                x={x}
                y={y}
                radius={circleSize}
                key={number}
                text={text}
              />
            );
          })}
        </Stage>
        <div id="debug">
          <h2>debug:</h2>
          {this.state.fileData}
        </div>
      </div>
    );
  }
}

export default App;
