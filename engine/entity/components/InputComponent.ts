import Entity from "../Entity";

export default interface InputComponent {
  update: (entity: Entity) => void;
}
