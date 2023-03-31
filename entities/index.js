import Matter from "matter-js";
import { Dimensions } from "react-native";
import Edges from "../components/Edges";
import Constants from "../Constants";
import createBall from "../components/Ball";
import Pocket from '../components/Pocket';

export default (gameWorld) => {
    let engine = Matter.Engine.create({ enableSleeping: false });
    let world = engine.world;
    engine.gravity.y = 0;

    let screenWidth = Dimensions.get("window").width;
    let screenHeight = Dimensions.get("window").height;

    const topLeftPocket = Pocket(world, { x: 30, y: 30, label: "Pocket" }, 30);
    const topRightPocket = Pocket(world, { x: screenWidth - 30, y: 30, label: "Pocket" }, 30);
    const bottomLeftPocket = Pocket(world, { x: 30, y: screenHeight - 30, label: "Pocket" }, 30);
    const bottomRightPocket = Pocket(world, { x: screenWidth - 30, y: screenHeight - 30, label: "Pocket" }, 30);

    // Calculate the initial position of the pool balls
    const ballRadius = 20;
    const xOffset = screenWidth / 2;
    const yOffset = screenHeight / 3;
    const triangleSpacing = ballRadius * 2.2;

    // Array of colors for the balls
    const colors = [
        "yellow",
        "navy",
        "red",
        "purple",
        "orange",
        "green",
        "maroon",
        "black",
        "yellow",
        "navy",
        "red",
        "purple",
        "orange",
        "green",
        "maroon",
    ];

    // Function to create pool balls in a reversed triangle
    const createReversedTriangle = () => {
        const balls = [];
        let colorIndex = 0;
        let currentY = yOffset + triangleSpacing * 4;
        for (let row = 1; row <= 5; row++) {
            let currentX = xOffset - (triangleSpacing * (row - 1)) / 2;
            for (let i = 0; i < row; i++) {
                const ballColor = colors[colorIndex % colors.length];
                balls.push(createBall(world, ballColor, { x: currentX, y: currentY }, { width: 40, height: 40 }, ballRadius, ballRadius, { isStatic: true }, { label: "Ball" }));
                currentX += triangleSpacing;
                colorIndex++;
            }
            currentY -= triangleSpacing;
        }
        return balls;
    };

    // Create pool balls in a reversed triangle
    const reversedTriangleBalls = createReversedTriangle();

    // Create cue ball
    const cueBall = createBall(world, "white", { x: xOffset, y: screenHeight - ballRadius * 3 }, { width: 40, height: 40 }, ballRadius, { isStatic: false }, { label: "Ball" });

    return {
        physics: { engine, world },

        ...reversedTriangleBalls,
        cueBall,

        topLeftPocket,
        topRightPocket,
        bottomLeftPocket,
        bottomRightPocket,

        TopEdge: Edges(
            world,
            "#bb3e03",
            { x: screenWidth / 2, y: 0 },
            { height: 30, width: screenWidth }
        ),
        LeftEdge: Edges(
            world,
            "#bb3e03",
            { x: 0, y: screenHeight / 2 },
            { height: screenHeight, width: 30 }
        ),
        RightEdge: Edges(
            world,
            "#bb3e03",
            { x: screenWidth, y: screenHeight / 2 },
            { height: screenHeight, width: 30 }
        ),
        BottomEdge: Edges(
            world,
            "#bb3e03",
            { x: screenWidth / 2, y: screenHeight },
            { height: 30, width: screenWidth }
        ),

    };
};
