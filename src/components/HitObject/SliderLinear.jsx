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

const Circle = ({ x, y, radius, text }) => {
  });
  return (
    <Container position={[0, 0]}>


      {/* cercle de fin */}
      {/* cercle du début */}
      <Circle  x={x}
                y={y}
                radius={radius}
                key={number}
                text={text}
              />
    </Container>
  );
};

export default withPixiApp(Slider);
