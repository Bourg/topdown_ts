import { Game } from "Engine/Game";

const canvas = <HTMLCanvasElement>document.getElementById("canvas");

new Game(5).start(canvas);
