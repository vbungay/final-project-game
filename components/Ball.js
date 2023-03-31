import { Dimensions, View } from "react-native";
import React from 'react';
import Matter from "matter-js";

const Ball = (props) => {
    const width = props.radius * 2;

    const x = props.body.position.x - width / 2;
    const y = props.body.position.y - width / 2;
  return (
    <View
      style={{
        width: width,
        height: width,
        left: x,
        top: y,
        borderRadius: props.radius,
        backgroundColor: props.color,
        position: "absolute",
      }}
    ></View>
  );
};

export default (world, color, pos, size, radius) => {
  const theBall = Matter.Bodies.circle(
    pos.x,
    pos.y,
    radius,
    { label: "Ball", frictionAir: 0, friction: 0, isStatic: false }
  );
  Matter.World.add(world, theBall);
  
  const BallRenderer = (props) => <Ball {...props} />;
  
  return { body: theBall, color, radius, renderer: BallRenderer };
};
