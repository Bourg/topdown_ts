import Game from "Engine/Game";
import World from "../../Engine/world/World";
import Entity from "../../Engine/entity/Entity";
import Point from "../../Engine/spacial/Point";

const canvas = <HTMLCanvasElement>document.getElementById("canvas");

const world = new World(40, 20);

const entityVelocity = new Point(2, 1);
const pixelScale = 32;

world.addEntity(
  new Entity(new Point(0, 0), new Point(1, 1), {
    input: (entity: Entity) => {},
    physics: (entity: Entity, timestepSeconds: number) => {
      entity.position.x += timestepSeconds * entityVelocity.x;
      entity.position.y += timestepSeconds * entityVelocity.y;
    },
    graphics: (
      entity: Entity,
      context: CanvasRenderingContext2D,
      leftoverSeconds: number
    ) => {
      context.strokeRect(
        pixelScale * (entity.position.x + entityVelocity.x * leftoverSeconds),
        pixelScale * (entity.position.y + entityVelocity.y * leftoverSeconds),
        pixelScale * entity.size.x,
        pixelScale * entity.size.y
      );
    }
  })
);

new Game(world, {
  updateFrequency: 120,
  resolution: {
    x: 360,
    y: 240
  }
}).start(canvas);
