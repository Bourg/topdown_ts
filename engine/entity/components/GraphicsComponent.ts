import Entity from "../Entity";

export default interface GraphicsComponent {
  render: (
    entity: Entity,
    context: CanvasRenderingContext2D,
    leftoverMillis: number
  ) => void;
}
