import React from 'react';
import { View } from 'react-native';
import Matter from 'matter-js';

const Pocket = (props) => {
    const width = props.radius * 2;
    const radius = props.radius;
  const diameter = radius * 2;
  const innerRadius = radius - 5;

    const x = props.body.position.x - width / 2;
    const y = props.body.position.y - width / 2;

    return (
        <View
      style={{
        width: diameter,
        height: diameter,
        position: "absolute",
        top: props.body.position.y - radius,
        left: props.body.position.x - radius,
        backgroundColor: "black",
        borderRadius: radius,
      }}
    >
      <View
        style={{
          width: innerRadius * 2,
          height: innerRadius * 2,
          position: "absolute",
          top: 5,
          left: 5,
          backgroundColor: "#6a994e",
          borderRadius: innerRadius,
        }}
      ></View>
    </View>
    );
};

export default (world, pos, radius) => {
    const pocketBody = Matter.Bodies.circle(pos.x, pos.y, radius, {
        isStatic: true,
        isSensor: true, // Make sure this property is set to true
        label: 'Pocket',
    });

    Matter.World.add(world, pocketBody);

    return { body: pocketBody, color: 'black', radius, renderer: <Pocket /> };
};
