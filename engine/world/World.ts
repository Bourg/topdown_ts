import Entity from "Engine/entity/Entity";
import Point from "Engine/spacial/Point";
import Rectangle from "Engine/spacial/Rectangle";

export default class World {
  size: Point;
  boundingRectangle: Rectangle;
  private entities: Array<Entity>;

  constructor(size: Point) {
    this.size = size.clone();
    this.boundingRectangle = Rectangle.fromPoint(size);
    this.entities = [];
  }

  addEntity(entity: Entity): void {
    this.entities.push(entity);
  }

  update(timestepSeconds: number): void {
    // Update each entity
    this.entities.forEach(entity => {
      entity.update(timestepSeconds);
    });

    // Delete entities that are marked for deletion (e.g. died)
    this.entities = this.entities.filter(entity => !entity.markedForDeletion);
  }

  render(context: CanvasRenderingContext2D, leftoverSeconds: number): void {
    this.entities.forEach(entity => entity.render(context, leftoverSeconds));
  }
}
