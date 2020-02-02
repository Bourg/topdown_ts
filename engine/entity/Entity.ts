import GraphicsComponent from "./components/GraphicsComponent";
import InputComponent from "./components/InputComponent";

export type EntityComponents = {
  graphics?: GraphicsComponent;
  input?: InputComponent;
};

export default class Entity {
  x: number;
  y: number;
  markedForDeletion: boolean;
  components: EntityComponents;

  constructor(x: number, y: number, components: EntityComponents = {}) {
    this.x = x;
    this.y = y;
    this.markedForDeletion = false;
    this.components = components;
  }

  update(timestepMillis: number): void {
    if (this.components.input) {
      this.components.input.update(this);
    }
  }

  render(context: CanvasRenderingContext2D, leftoverMillis: number) {
    if (this.components.graphics) {
      this.components.graphics.render(this, context, leftoverMillis);
    }
  }
}
