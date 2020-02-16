import Game from "Engine/Game";
import World from "Engine/world/World";
import Entity from "Engine/entity/Entity";
import Point from "Engine/spacial/Point";

const canvas = <HTMLCanvasElement>document.getElementById("canvas");

const world = new World(new Point(36, 24));
const pixelScale = 50;

const bouncePhysics = (entity: Entity, timestepSeconds: number) => {
  if (!entity.boundingRectangle.within(world.boundingRectangle)) {
    if (
      entity.boundingRectangle.top < 0 ||
      entity.boundingRectangle.bottom > world.boundingRectangle.bottom
    ) {
      entity.velocity.scaleBy(new Point(1, -1));
    }

    if (
      entity.boundingRectangle.left < 0 ||
      entity.boundingRectangle.right > world.boundingRectangle.right
    ) {
      entity.velocity.scaleBy(new Point(-1, 1));
    }
  }
};

const wireframeGraphics = (color: string) => (
  entity: Entity,
  context: CanvasRenderingContext2D,
  leftoverSeconds: number
) => {
  context.save();
  context.fillStyle = color;

  context.fillRect(
    pixelScale * entity.position.x,
    pixelScale * entity.position.y,
    pixelScale * entity.size.x,
    pixelScale * entity.size.y
  );

  context.restore();
};

const randomizedComponents = () => {
  const colors = ["red", "white", "blue"];

  return {
    physics: bouncePhysics,
    graphics: wireframeGraphics(
      colors[Math.floor(colors.length * Math.random())]
    )
  };
};

for (let i = 0; i < 50; i++) {
  const size = new Point(
    Math.floor(1 + 3 * Math.random()),
    Math.floor(1 + 3 * Math.random())
  );

  const location = new Point(
    Math.floor((world.boundingRectangle.width - size.x) * Math.random()),
    Math.floor((world.boundingRectangle.height - size.y) * Math.random())
  );

  const initialVelocity = new Point(
    (Math.random() < 0.5 ? 1 : -1) * (5 + 8 * Math.random()),
    (Math.random() < 0.5 ? 1 : -1) * (5 + 8 * Math.random())
  );

  world.addEntity(
    new Entity(size, location, initialVelocity, randomizedComponents())
  );
}

new Game(world, {
  updateFrequency: 60,
  resolution: {
    x: 1800,
    y: 1200
  }
}).start(canvas);
