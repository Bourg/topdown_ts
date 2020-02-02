/**
 * Game is the top-level of a running instance of the game engine.
 * It is responsible for doing engine setup and initializing the game loop.
 */
export class Game {
  private readonly timestepMillis: number;

  constructor(timestepMillis: number = 10) {
    this.timestepMillis = timestepMillis;
  }

  /**
   * Start the main game loop on a given canvas.
   *
   * @param canvas The canvas to which the game should mount.
   */
  start(canvas: HTMLCanvasElement): void {
    const context: CanvasRenderingContext2D | null = canvas.getContext("2d");
    if (!context) {
      console.error("getContext returned null, failed to start game");
      return;
    }

    this.startLoop(context);
  }

  private startLoop(context: CanvasRenderingContext2D): void {
    let t = 0;

    let currentTime = new Date().getTime();
    let accumulator = 0.0;

    let loop = () => {
      // Immediately request the next frame
      requestAnimationFrame(loop);

      // Rotate times
      const newTime = new Date().getTime();
      const frameTime = newTime - currentTime;
      currentTime = newTime;

      accumulator += frameTime;

      // Consume time since last frame with updates
      while (accumulator >= this.timestepMillis) {
        this.update(this.timestepMillis);
        accumulator -= this.timestepMillis;
        t += this.timestepMillis;
      }

      // Once there is less than one timestep left, render and interpolate the leftover
      this.render(context, accumulator);
    };

    loop();
  }

  private update(elapsed: number): void {
    console.log(`Running update with elapsed = ${elapsed}`);
  }

  private render(context: CanvasRenderingContext2D, leftover: number): void {
    console.log(`Running render with leftover = ${leftover}`);
  }
}
