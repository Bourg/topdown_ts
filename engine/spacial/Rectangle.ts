import Point from "./Point";

export default class Rectangle {
  left: number;
  top: number;
  width: number;
  height: number;

  constructor(left: number, top: number, width: number, height: number) {
    this.left = left || 0;
    this.top = top || 0;
    this.width = width || 0;
    this.height = height || 0;
  }

  static fromPoint(topLeft: Point): Rectangle {
    return new Rectangle(0, 0, topLeft.x, topLeft.y);
  }

  static fromPoints(topLeft: Point, size: Point): Rectangle {
    return new Rectangle(topLeft.x, topLeft.y, size.x, size.y);
  }

  get whole() {
    const wholeLeft = Math.floor(this.left);
    const wholeRight = Math.ceil(this.right);
    const wholeTop = Math.floor(this.top);
    const wholeBottom = Math.ceil(this.bottom);

    return new Rectangle(
      wholeLeft,
      wholeTop,
      wholeRight - wholeLeft,
      wholeBottom - wholeTop
    );
  }

  get right() {
    return this.left + this.width;
  }

  get bottom() {
    return this.top + this.height;
  }

  within(r: Rectangle) {
    return (
      r.left <= this.left &&
      r.right >= this.right &&
      r.top <= this.top &&
      r.bottom >= this.bottom
    );
  }

  overlaps(r: Rectangle) {
    return (
      this.left < r.right &&
      r.left < this.right &&
      this.top < r.bottom &&
      r.top < this.bottom
    );
  }
}
