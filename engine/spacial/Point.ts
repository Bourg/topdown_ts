export default class Point {
  x: number;
  y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  clone(): Point {
    return new Point(this.x, this.y);
  }

  add(other: Point): void {
    this.x = this.x + other.x;
    this.y = this.y + other.y;
  }

  scaledBy(scaleBy: number | Point): Point {
    let scaleByX;
    let scaleByY;

    if (typeof scaleBy === "number") {
      scaleByX = scaleBy;
      scaleByY = scaleBy;
    } else {
      scaleByX = scaleBy.x;
      scaleByY = scaleBy.y;
    }

    return new Point(this.x * scaleByX, this.y * scaleByY);
  }
}
