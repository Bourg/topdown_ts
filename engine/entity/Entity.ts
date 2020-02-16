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
  size: Point;
  position: Point;
  velocity: Point;
  markedForDeletion: boolean;
  components: EntityComponents;

  constructor(
    size: Point,
    position: Point,
    velocity: Point,
    components: EntityComponents = {}
  ) {
    this.size = size.clone();
    this.position = position.clone();
    this.velocity = velocity.clone();
    this.markedForDeletion = false;
    this.components = components;
  }

  get boundingRectangle(): Rectangle {
    return Rectangle.fromPoints(this.position, this.size);
  }

  update(timestepSeconds: number): void {
    if (this.components.input) {
      this.components.input(this);
    }

    this.position.add(this.velocity.scaledBy(timestepSeconds));

    if (this.components.physics) {
      this.components.physics(this, timestepSeconds);
    }
  }

  render(context: CanvasRenderingContext2D, timestepSeconds: number) {
    if (this.components.graphics) {
      this.components.graphics(this, context, timestepSeconds);
    }
  }
}
