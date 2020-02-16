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
    this.x += other.x;
    this.y += other.y;
  }

  scaleBy(scaleBy: number | Point): void {
    let scaleByX;
    let scaleByY;

    if (typeof scaleBy === "number") {
      scaleByX = scaleBy;
      scaleByY = scaleBy;
    } else {
      scaleByX = scaleBy.x;
      scaleByY = scaleBy.y;
    }

    this.x *= scaleByX;
    this.y *= scaleByY;
  }

  scaledBy(scaleBy: number | Point): Point {
    const clone = this.clone();
    clone.scaleBy(scaleBy);
    return clone;
  }
}
