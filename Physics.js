import Matter, { Sleeping } from 'matter-js';

const Physics = (entities, { touches, dispatch, events, time }) => {
    let engine = entities.physics.engine;
    const cueBall = entities.cueBall;
    const ballRadius = 20;

    Object.values(entities).forEach((entity) => {
        if (entity.label === "Pocket") {
            Object.values(entities).forEach((otherEntity) => {
                if (otherEntity.label === "Ball") {
                    handleBallPocketCollision(otherEntity.body, entity.body, engine.world);
                }
            });
        }
    });

    touches.forEach((t) => {
        const { pageX, pageY } = t.event;

        const touchX = pageX;
        const touchY = pageY;

        const dx = cueBall.body.position.x - touchX;
        const dy = cueBall.body.position.y - touchY;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (t.type === 'start' && distance <= ballRadius) {
            const forceMagnitude = 0.02 * cueBall.body.mass;
            Matter.Body.applyForce(cueBall.body, cueBall.body.position, {
                x: 0,
                y: -forceMagnitude,
            });
        }
    });

    // Collision handling
    Matter.Events.on(engine, 'collisionStart', (event) => {
        const pairs = event.pairs;
        pairs.forEach(({ bodyA, bodyB }) => {
            if ((bodyA.label === 'Pocket' && bodyB.label === 'Ball') || (bodyA.label === 'Ball' && bodyB.label === 'Pocket')) {
                const ball = bodyA.label === 'Ball' ? bodyA : bodyB;
                Matter.Composite.remove(engine.world, ball);
            }
        });
    });

    Matter.Engine.update(engine, time.delta);

    return entities;
};

export default Physics;
