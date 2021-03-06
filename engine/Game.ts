import World from "Engine/world/World";

/**
 * Game is the top-level of a running instance of the game engine.
 * It is responsible for doing engine setup and initializing the game loop.
 */
export type GameSettings = {
  readonly updateFrequency: number;
  readonly resolution: {
    readonly x: number;
    readonly y: number;
  };
};

export default class Game {
  private world: World;
  private readonly gameSettings: GameSettings;

  constructor(world: World, gameSettings: GameSettings) {
    this.world = world;
    this.gameSettings = gameSettings;
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

    canvas.width = this.gameSettings.resolution.x;
    canvas.height = this.gameSettings.resolution.y;

    this.startLoop(context);
  }

  private startLoop(context: CanvasRenderingContext2D): void {
    const timestepSeconds = 1.0 / this.gameSettings.updateFrequency;
    let t = 0;

    let previousTime = new Date().getTime() / 1000.0;
    let accumulator = 0.0;

    let loop = () => {
      // Immediately request the next frame
      requestAnimationFrame(loop);

      // Rotate times
      const nextTime = new Date().getTime() / 1000.0;
      const frameTime = nextTime - previousTime;
      previousTime = nextTime;
      accumulator += frameTime;

      // Consume time since last frame with updates
      while (accumulator >= timestepSeconds) {
        this.update(timestepSeconds);
        accumulator -= timestepSeconds;
        t += timestepSeconds;
      }

      // Once there is less than one timestep left, render and interpolate the leftover
      this.render(context, accumulator);
    };

    loop();
  }

  private update(elapsedSeconds: number): void {
    this.world.update(elapsedSeconds);
  }

  private render(
    context: CanvasRenderingContext2D,
    leftoverSeconds: number
  ): void {
    context.clearRect(
      0,
      0,
      this.gameSettings.resolution.x,
      this.gameSettings.resolution.y
    );
    this.world.render(context, leftoverSeconds);
  }
}
