import {
  PixiComponent,
  Stage,
  Text,
  Container,
  withPixiApp,
  Sprite,
} from "@inlet/react-pixi";
import React from "react";
import { Graphics, TextStyle } from "pixi.js";

// * https://pixijs.download/release/docs/PIXI.Graphics.html#drawCircle
const customCircle = PixiComponent("customCircle", {
  create: (props) => new Graphics(),
  applyProps: (inst, _, props) => {
    const { x, y, radius, color } = props;

    inst.clear();
    inst.beginFill(color);
    inst.drawCircle(x, y, radius);
    inst.endFill();
  },
});

const GameNote = ({ x, y, radius, color, text }) => {
  const style = new TextStyle({
    align: "center",
    fill: "#000bff",
    strokeThickness: 2,
    fontSize: (radius * 3) / 4,
    fontFamily: "Tahoma",
    fontWeight: "bolder",
  });
  return (
    <Container position={[x, y]}>
      <customCircle x={radius} y={radius} radius={radius} color={0xff0000} />
      <customCircle
        x={radius}
        y={radius}
        radius={(radius * 3) / 4}
        color={0x00ff00}
      />
      <Text
        x={radius}
        y={radius}
        text={text}
        style={style}
        anchor={[0.5, 0.5]}
      />
    </Container>
  );
};

export default withPixiApp(GameNote);
