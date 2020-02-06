import Entity from "Engine/entity/Entity";

export default class World {
  width: number;
  height: number;
  private entities: Array<Entity>;

  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;
    this.entities = [];
  }

  addEntity(entity: Entity) {
    this.entities.push(entity);
  }

  update(timestepSeconds: number) {
    // Update each entity
    this.entities.forEach(entity => {
      entity.update(timestepSeconds);
    });

    // Delete entities that are marked for deletion (e.g. died)
    this.entities = this.entities.filter(entity => !entity.markedForDeletion);
  }

  render(context: CanvasRenderingContext2D, leftoverSeconds: number) {
    this.entities.forEach(entity => entity.render(context, leftoverSeconds));
  }
}
