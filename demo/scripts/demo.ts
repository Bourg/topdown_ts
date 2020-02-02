import Game from "Engine/Game";
import World from "../../Engine/world/World";
import Entity from "../../Engine/entity/Entity";

const canvas = <HTMLCanvasElement>document.getElementById("canvas");

const world = new World(40, 20);
world.addEntity(new Entity(0, 0));

new Game(world, {
  updateFrequency: 120,
  resolution: {
    x: 360,
    y: 240
  }
}).start(canvas);
