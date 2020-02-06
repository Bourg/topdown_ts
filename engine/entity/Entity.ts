import Point from "Engine/spacial/Point";
import Rectangle from "Engine/spacial/Rectangle";
import {
  GraphicsComponent,
  InputComponent,
  PhysicsComponent
} from "./components/Components";

export type EntityProperties = {};

export type EntityComponents = {
  input?: InputComponent;
  physics?: PhysicsComponent;
  graphics?: GraphicsComponent;
};

export default class Entity {
  position: Point;
  size: Point;
  markedForDeletion: boolean;
  components: EntityComponents;

  constructor(position: Point, size: Point, components: EntityComponents = {}) {
    this.position = position;
    this.size = size;
    this.markedForDeletion = false;
    this.components = components;
  }

  get boundingRectangle(): Rectangle {
    return Rectangle.fromPoints(this.position, this.size);
  }

  update(timestepMillis: number): void {
    if (this.components.input) {
      this.components.input(this);
    }

    if (this.components.physics) {
      this.components.physics(this, timestepMillis);
    }
  }

  render(context: CanvasRenderingContext2D, leftoverMillis: number) {
    if (this.components.graphics) {
      this.components.graphics(this, context, leftoverMillis);
    }
  }
}
