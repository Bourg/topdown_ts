export default class Entity {
  x: number;
  y: number;
  markedForDeletion: boolean;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
    this.markedForDeletion = false;
  }

  update(timestepMillis: number): void {}

  render(context: CanvasRenderingContext2D, leftoverMillis: number) {}
}
