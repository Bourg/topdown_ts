import Entity from "../Entity";

export type InputComponent = (entity: Entity) => void;

export type PhysicsComponent = (entity: Entity, timestepMillis: number) => void;

export type GraphicsComponent = (
  entity: Entity,
  context: CanvasRenderingContext2D,
  leftoverMillis: number
) => void;
