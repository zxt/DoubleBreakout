import Game from "./Game.js";
import { settings } from "./settings.js";

window.addEventListener("load", function() {
    let canvas = document.getElementById("gameCanvas");
    let ctx = canvas.getContext("2d");
    let game = new Game(ctx, canvas.width, canvas.height, settings.p1);
    game.run();

    let canvas2 = document.getElementById("gameCanvas2");
    let ctx2 = canvas2.getContext("2d");
    let game2 = new Game(ctx2, canvas2.width, canvas2.height, settings.p2);
    game2.run();
})